const User = require('../models/User');
const { logEvent } = require('../services/historyService');

const userStates = {};

// Comando per iniziare la registrazione
const startCommand = async (bot, msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id;

  try {
    const user = await User.findOne({ telegramId });

    if (user) {
      return bot.sendMessage(chatId, `Bentornato, ${user.firstName}! Sei già registrato. Vuoi modificare il tuo profilo?`);
    }

    // Inizializza lo stato dell'utente
    userStates[telegramId] = { step: 1 }; // Impostiamo il primo step della registrazione
    bot.sendMessage(chatId, "Benvenuto! Come ti chiami? (Inserisci il tuo nome)");
  } catch (error) {
    console.error('Errore nel comando /start:', error);
    bot.sendMessage(chatId, '❌ Si è verificato un errore. Riprova più tardi.');
  }
};



// Gestione della registrazione guidata
const handleRegistration = async (bot, msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id;

  // Se l'utente non è in fase di registrazione, non fare nulla
  if (!userStates[telegramId]) {
    console.log(`Nessun stato trovato per ${telegramId}.`);
    return;
  }

  const state = userStates[telegramId];

  try {
    console.log(`Stato attuale per ${telegramId}:`, state); // Log dello stato
    switch (state.step) {
      case 1:
        state.firstName = msg.text;
        state.step++; // Incrementiamo lo step per passare al prossimo
        console.log(`Nome inserito: ${state.firstName}`); // Log per il nome
        bot.sendMessage(chatId, 'Ottimo! Ora inserisci il tuo cognome.');
        break;

      case 2:
        state.lastName = msg.text;
        state.step++; // Passiamo al prossimo step
        console.log(`Cognome inserito: ${state.lastName}`); // Log per il cognome
        bot.sendMessage(chatId, 'Perfetto! Ora carica una foto per impostarla come avatar.');
        break;

      case 3:
        if (msg.photo && msg.photo.length > 0) {
          const photoId = msg.photo[msg.photo.length - 1].file_id;
          const file = await bot.getFile(photoId);
          const avatarUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${file.file_path}`;

          const newUser = new User({
            telegramId,
            firstName: state.firstName,
            lastName: state.lastName,
            avatarUrl,
          });
          await newUser.save();

          // Registra l'evento nella cronistoria
          await logEvent('Registrazione', `${state.firstName} ${state.lastName} si è registrato.`, [newUser._id], 'User');

          delete userStates[telegramId]; // Rimuoviamo lo stato dell'utente
          bot.sendMessage(chatId, `🎉 Registrazione completata! Benvenuto, ${state.firstName}!`);
        } else {
          bot.sendMessage(chatId, 'Per favore, carica una foto valida per il tuo avatar.');
        }
        break;

      default:
        break;
    }
  } catch (error) {
    console.error('Errore durante la registrazione guidata:', error);
    bot.sendMessage(chatId, '❌ Si è verificato un errore. Riprova più tardi.');
  }
};

module.exports = { startCommand, handleRegistration };

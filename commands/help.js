const commandList = require('./commandList');

const helpCommand = async (bot, msg) => {
  const chatId = msg.chat.id;

  try {
    // Genera i bottoni dinamicamente
    const buttons = commandList.map(cmd => ({
      text: cmd.command, // Testo visibile
      callback_data: cmd.command, // Comando da eseguire
    }));

    // Dividi i bottoni in righe (1 bottone per riga)
    const inlineKeyboard = buttons.map(button => [button]);

    // Invia il messaggio con la tastiera inline
    await bot.sendMessage(chatId, 'Ecco la lista dei comandi disponibili:', {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
  } catch (error) {
    console.error('Errore nel comando /help:', error);
    bot.sendMessage(chatId, '❌ Si è verificato un errore nel generare la lista dei comandi.');
  }
};

module.exports = { helpCommand };

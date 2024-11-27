const User = require('../models/User');
const { downloadFile } = require('../axiosClient');

const profileCommand = async (bot, msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id;

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return bot.sendMessage(chatId, "Non sei registrato. Usa /start per iniziare.");
    }

    const response = `
👤 Profilo di ${user.firstName} ${user.lastName}:
- Fazione: ${user.faction || 'Nessuna'}
- Taglia: ${user.bounty} Berry
    `;

    if (user.avatarUrl) {
      // Scarica il file dall'URL utilizzando la libreria Axios
      const buffer = await downloadFile(user.avatarUrl);

      // Invia l'immagine come file binario
      await bot.sendPhoto(chatId, buffer, { caption: response });
    } else {
      bot.sendMessage(chatId, response);
    }
  } catch (error) {
    console.error('Errore nel comando /profile:', error);
    bot.sendMessage(chatId, 'Si è verificato un errore. Riprova più tardi.');
  }
};

module.exports = {
  profileCommand,
};

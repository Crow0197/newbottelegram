const { generateDynamicEvent } = require('../services/aiService');

const aiEventCommand = async (bot, msg) => {
  const chatId = msg.chat.id;

  try {
    const newEvent = await generateDynamicEvent();
    bot.sendMessage(chatId, `🌟 Nuovo evento generato:\n${newEvent}`);
  } catch (error) {
    console.error('Errore durante la generazione dell\'evento AI:', error);
    bot.sendMessage(chatId, '❌ Si è verificato un errore durante la generazione dell\'evento.');
  }
};

module.exports = { aiEventCommand };

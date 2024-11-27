const loadData = require('../initData'); // Assicurati che il percorso sia corretto

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;

  try {
    await loadData();
    bot.sendMessage(chatId, 'Aggiornamento completato! Elementi mancanti aggiunti.');
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dei dati:', error);
    bot.sendMessage(chatId, 'Errore durante l\'aggiornamento. Controlla i log.');
  }
};

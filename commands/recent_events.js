const { getRecentEvents } = require('../services/historyService');

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;

  try {
    const events = await getRecentEvents(10);
    if (events.length === 0) {
      bot.sendMessage(chatId, 'Nessun evento recente trovato.');
    } else {
      const eventList = events
        .map((event, index) => `${index + 1}. [${event.type}] ${event.details} (${event.timestamp.toISOString()})`)
        .join('\n');
      bot.sendMessage(chatId, `Eventi recenti:\n${eventList}`);
    }
  } catch (error) {
    console.error('Errore durante il recupero degli eventi recenti:', error);
    bot.sendMessage(chatId, 'Errore durante il recupero degli eventi recenti.');
  }
};

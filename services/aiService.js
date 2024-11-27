const { logEvent, getRecentEvents } = require('./historyService');

const generateDynamicEvent = async () => {
  // Recupera gli ultimi eventi
  const recentEvents = await getRecentEvents(2000);

  // Crea un contesto basato sulla cronistoria
  const context = recentEvents.map(event => `${event.type}: ${event.details}`).join('\n');

  console.log('Contesto attuale:', context);

  // Genera un nuovo evento basato sulla cronistoria
  const newEventDetails = `Una nuova missione per una ciurma basata sugli eventi: ${context}`;
  await logEvent('Missione', newEventDetails);

  return newEventDetails; // Restituisce il nuovo evento generato
};

module.exports = { generateDynamicEvent };

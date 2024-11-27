const History = require('../models/History');

// Funzione per registrare un evento nella cronistoria
const logEvent = async (type, details, relatedEntities = [], relatedModel = null) => {
  try {
    const newEvent = new History({
      type,
      details,
      relatedEntities,
      relatedModel,
    });
    await newEvent.save();
    console.log('Evento registrato nella cronistoria:', details);
  } catch (error) {
    console.error('Errore durante la registrazione dell\'evento:', error);
  }
};

// Funzione per recuperare eventi recenti
const getRecentEvents = async (limit = 10) => {
  try {
    return await History.find().sort({ timestamp: -1 }).limit(limit);
  } catch (error) {
    console.error('Errore durante il recupero degli eventi:', error);
    return [];
  }
};

module.exports = { logEvent, getRecentEvents };

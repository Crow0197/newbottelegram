const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }, // Data e ora dell'evento
  type: { type: String, required: true }, // Tipo di evento (es. 'Azione', 'Fazione', 'Registrazione')
  details: { type: String, required: true }, // Descrizione dell'evento
  relatedEntities: { type: [mongoose.Schema.Types.ObjectId], refPath: 'relatedModel' }, // Entità coinvolte
  relatedModel: { type: String }, // Modello della collezione associata
});

module.exports = mongoose.model('History', HistorySchema);

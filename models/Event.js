const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Usa 'name' al posto di 'title'
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Evento', eventoSchema);

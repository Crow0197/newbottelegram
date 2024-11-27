const mongoose = require('mongoose');

const fazioneSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Nome della fazione
  description: { type: String, required: true }, // Descrizione della fazione
});

module.exports = mongoose.model('Fazione', fazioneSchema);

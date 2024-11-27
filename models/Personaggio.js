const mongoose = require('mongoose');

const personaggioSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Nome del personaggio
  faction: { type: String, required: true },     // Fazione a cui appartiene
  bounty: { type: Number },      // Taglia sul capo
  role: { type: String  },        // Ruolo del personaggio
});

module.exports = mongoose.model('Personaggio', personaggioSchema);

const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Nome della ciurma
  captain: { type: String}, // Riferimento al Personaggio
});

module.exports = mongoose.model('Crew', crewSchema);

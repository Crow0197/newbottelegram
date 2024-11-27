const mongoose = require('mongoose');

const armaSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Nome dell'arma
  type: { type: String, required: true },      // Tipo dell'arma (es. spada, alabarda)
  rank: { type: String, required: true },      // Classificazione dell'arma (es. Wazamono, Saijō Ō Wazamono)
  rarity: { type: Number, required: true },    // Rarità dell'arma (numero)
});

module.exports = mongoose.model('Arma', armaSchema);

const mongoose = require('mongoose');

const fruttoSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  rarity: Number,
});

module.exports = mongoose.model('Frutto', fruttoSchema);

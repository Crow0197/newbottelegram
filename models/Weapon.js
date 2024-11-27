const mongoose = require('mongoose');

const WeaponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Sword', 'Gun', 'Other'], default: 'Other' },
  grade: { type: String, enum: ['Common', 'Rare', 'Epic', 'Legendary'], default: 'Common' },
  power: { type: String, default: null }, // Poteri speciali
  description: { type: String, default: '' },
  createdByAI: { type: Boolean, default: false }, // Indica se l'arma è stata generata dall'IA
});

module.exports = mongoose.model('Weapon', WeaponSchema);

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['DevilFruit', 'Material', 'Tool'], default: 'Tool' },
  description: { type: String, default: '' },
  effect: { type: String, default: '' }, // Effetto particolare (per frutti del diavolo o altri oggetti)
  createdByAI: { type: Boolean, default: false },
});

module.exports = mongoose.model('Item', ItemSchema);

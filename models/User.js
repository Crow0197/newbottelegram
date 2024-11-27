const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  avatarUrl: { type: String, default: null }, // URL immagine avatar
  faction: { type: String, enum: ['Pirate', 'Marine', 'BountyHunter'], default: null },
  crew: { type: String, default: null },
  bounty: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  haki: {
    observation: { type: Number, default: 0 },
    armament: { type: Number, default: 0 },
    conqueror: { type: Number, default: 0 },
  },
  inventory: {
    items: [
      {
        name: { type: String },
        description: { type: String },
        category: { type: String, enum: ['Weapon', 'Tool', 'Other'] },
        quantity: { type: Number, default: 1 },
        grade: { type: String, enum: ['Common', 'Rare', 'Epic', 'Legendary'], default: 'Common' },
      },
    ],
    devilFruit: {
      name: { type: String },
      type: { type: String, enum: ['Paramecia', 'Zoan', 'Logia'], default: null },
      eaten: { type: Boolean, default: false },
    },
  },
  role: { type: String, enum: ['Captain', 'Crewmate', 'Admiral'], default: 'Crewmate' },
});

module.exports = mongoose.model('User', UserSchema);

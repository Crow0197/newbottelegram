const User = require('../models/User');
const { logEvent } = require('../services/historyService');

const eatFruitCommand = async (bot, msg, fruitName) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id;

  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return bot.sendMessage(chatId, "Non sei registrato. Usa /start per iniziare.");
    }

    if (user.inventory.devilFruit.eaten) {
      return bot.sendMessage(chatId, "Hai già mangiato un Frutto del Diavolo!");
    }

    user.inventory.devilFruit = { name: fruitName, eaten: true };
    await user.save();

    // Registra l'evento nella cronistoria
    await logEvent('Azione', `${user.firstName} ${user.lastName} ha mangiato il Frutto del Diavolo: ${fruitName}.`, [user._id], 'User');

    bot.sendMessage(chatId, `Hai mangiato il Frutto del Diavolo: ${fruitName}!`);
  } catch (error) {
    console.error('Errore durante il comando eatFruit:', error);
    bot.sendMessage(chatId, 'Si è verificato un errore. Riprova più tardi.');
  }
};

module.exports = { eatFruitCommand };

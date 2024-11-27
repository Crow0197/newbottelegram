require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const connectDB = require('./db');
const { userStates } = require('./state');
const loadData = require('./initData');
const updateDataCommand = require('./commands/updateData'); // Aggiungi questa riga
const recentEventsCommand = require('./commands/recent_events');


// Importa i comandi
const { startCommand, handleRegistration } = require('./commands/registration');
const { profileCommand } = require('./commands/interaction');
const { aiEventCommand } = require('./commands/ai');
const { eatFruitCommand } = require('./commands/actions');
const { helpCommand } = require('./commands/help');

// Connetti al database
connectDB();

// Configura il bot
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

(async () => {
  try {
    console.log('Verifica e caricamento dei dati iniziali...');
    await loadData();
  } catch (error) {
    console.error('Errore durante il caricamento dei dati iniziali:', error);
  }
})();

/**
 * ============================================
 * REGION: Funzioni di gestione dei comandi
 * ============================================
 */

// #region Comando /start
bot.onText(/\/start/, (msg) => startCommand(bot, msg));
// #endregion

// #region Comando /help
bot.onText(/\/help/, (msg) => helpCommand(bot, msg));
// #endregion

// #region Comando /profile
bot.onText(/\/profile/, (msg) => profileCommand(bot, msg));
// #endregion

// #region Comando /ai_event
bot.onText(/\/ai_event/, (msg) => aiEventCommand(bot, msg));
// #endregion

// #region Comando /eat_fruit
bot.onText(/\/eat_fruit (.+)/, (msg, match) => {
  const fruitName = match[1];
  eatFruitCommand(bot, msg, fruitName);
});
// #endregion

// #region Comando /update_data
bot.onText(/\/update_data/, updateDataCommand);
// #endregion

// #region Comando /recent_events
bot.onText(/\/recent_events/, recentEventsCommand);
// #endregion

/**
 * ============================================
 * REGION: Registrazione guidata\
 * ============================================
 */

// Gestione delle risposte durante la registrazione guidata
bot.on('message', async (msg) => {
  handleRegistration(bot, msg);
});

/**
 * ============================================
 * REGION: Avvio del bot
 * ============================================
 */
console.log('Bot avviato e in ascolto!');

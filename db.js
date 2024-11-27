const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database connesso!');
  } catch (error) {
    console.error('Errore durante la connessione al database:', error);
    process.exit(1); // Termina il processo in caso di errore
  }
};

module.exports = connectDB;

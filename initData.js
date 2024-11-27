const fs = require('fs');
const path = require('path');
const Frutto = require('./models/Frutto');
const Arma = require('./models/Arma');
const Evento = require('./models/Event');
const Fazione = require('./models/Fazione');
const Ciurma = require('./models/Crew');
const Personaggio = require('./models/Personaggio');
const { logEvent } = require('./services/historyService'); // Importa logEvent

async function loadData() {
  const files = [
    { model: Frutto, file: 'one_piece_50_frutti_originali.json', name: 'Frutti' },
    { model: Arma, file: 'one_piece_armi.json', name: 'Armi' },
    { model: Evento, file: 'one_piece_eventi.json', name: 'Eventi' },
    { model: Fazione, file: 'one_piece_fazioni.json', name: 'Fazioni' },
    { model: Ciurma, file: 'one_piece_ciurme.json', name: 'Ciurme' },
    { model: Personaggio, file: 'one_piece_personaggi.json', name: 'Personaggi' },
  ];

  for (const { model, file, name } of files) {
    const filePath = path.join(__dirname, 'data', file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const existingCount = await model.countDocuments();
    if (existingCount === 0) {
      console.log(`Popolando ${name}...`);
      
      // Modifica i dati delle ciurme per sostituire il nome del capitano con l'ObjectId
      if (name === 'Ciurme') {
        for (const crew of data) {
          const captain = await Personaggio.findOne({ name: crew.captain });
          if (captain) {
            crew.captain = captain._id;  // Sostituisci con ObjectId del capitano
          } else {
            console.warn(`Capitano non trovato per la ciurma: ${crew.name}`);
          }
        }
      }

      const insertedData = await model.insertMany(data);

      // Registra ogni elemento nella cronistoria usando logEvent
      for (const item of insertedData) {
        await logEvent(
          name,
          `Inserito elemento iniziale nella collezione ${name}: ${item.name || item.description}`,
          [item._id],
          model.modelName
        );
      }

      // Se la collezione è "Eventi", usa il timestamp specifico
      if (name === 'Eventi') {
        console.log('Aggiungendo gli eventi alla cronologia con logEvent...');
        for (const evento of insertedData) {
          await logEvent(
            'Evento',
            evento.description,
            [evento._id],
            model.modelName
          );
        }
      }
    } else {
      console.log(`${name} già presenti nel database.`);
    }
  }

  console.log('Dati iniziali caricati (se necessario).');
  console.clear();
}

module.exports = loadData;

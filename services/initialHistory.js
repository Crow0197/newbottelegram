const { logEvent, getRecentEvents } = require('./historyService');

const createInitialHistory = async () => {
  try {
    console.log('Verifica della cronistoria iniziale...');

    // Controlla se esiste già un evento del tipo "Sistema" per la cronistoria iniziale
    const existingHistory = await getRecentEvents(1); // Recupera l'ultimo evento
    const isInitialized = existingHistory.some(
      (event) => event.type === 'Sistema' && event.details === 'Cronistoria iniziale creata'
    );

    if (isInitialized) {
      console.log('Cronistoria iniziale già presente. Nessuna azione necessaria.');
      return;
    }

    console.log('Creazione della cronistoria iniziale...');

    // Aggiungi gli eventi della cronistoria iniziale
    await logEvent('Scoperta', 'Gol D. Roger annuncia l\'esistenza del tesoro One Piece.');
    await logEvent('Era della Pirateria', 'Inizia l\'era della grande pirateria.');
    await logEvent('Fazione', 'La Marina giura di mantenere l\'ordine e combattere i pirati.');
    await logEvent('Fazione', 'I Rivoluzionari si organizzano contro il Governo Mondiale.');
    await logEvent('Personaggio', 'Introduzione degli Yonkou: Kaido, Big Mom, Shanks, Barbanera.');
    await logEvent('Potere', 'Diffusione dei Frutti del Diavolo, che donano poteri straordinari.');
    await logEvent('Potere', 'Scoperta dell\'Haki: un\'abilità utilizzata dai più forti.');

    // Registra un evento per indicare che la cronistoria iniziale è stata creata
    await logEvent('Sistema', 'Cronistoria iniziale creata');

    console.log('Cronistoria iniziale creata con successo!');
  } catch (error) {
    console.error('Errore durante la creazione della cronistoria iniziale:', error);
  }
};

module.exports = { createInitialHistory };

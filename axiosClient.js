const axios = require('axios');

// Configurazione di base di Axios
const axiosClient = axios.create({
  baseURL: '', // Puoi impostare una baseURL comune, se necessario
  timeout: 10000, // Timeout di 10 secondi
});

// Funzione per scaricare un file da un URL
const downloadFile = async (url) => {
  try {
    const response = await axiosClient.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary'); // Restituisce il buffer
  } catch (error) {
    console.error('Errore durante il download del file:', error.message);
    throw new Error('Impossibile scaricare il file.');
  }
};

module.exports = { downloadFile };

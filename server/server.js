const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Função para obter a cotação do dólar
async function getDolarCotacao() {
  try {
    const response = await axios.get('https://api.bcb.gov.br/dados/serie/bcdata.sgs.10813/dados/ultimos/1?formato=json');
    const dolarValue = response.data[0].valor;
    return parseFloat(dolarValue);
  } catch (error) {
    throw new Error('Erro ao obter cotação do dólar.');
  }
}

app.get('/cotacao', async (req, res) => {
  try {
    const apiKey = 'kjw_6Hyyw6nWLhTTQnnF';

    const sojaResponse = await axios.get(`https://www.quandl.com/api/v3/datasets/CHRIS/CME_S1.json?api_key=${apiKey}`);
    const milhoResponse = await axios.get(`https://www.quandl.com/api/v3/datasets/CHRIS/CME_C1.json?api_key=${apiKey}`);
    const trigoResponse = await axios.get(`https://www.quandl.com/api/v3/datasets/CHRIS/CME_W1.json?api_key=${apiKey}`);

    const soja = sojaResponse.data.dataset.data[0][4];
    const milho = milhoResponse.data.dataset.data[0][4];
    const trigo = trigoResponse.data.dataset.data[0][4];

    const dolarCotacao = await getDolarCotacao();

    const sojaEmReais = soja * dolarCotacao;
    const milhoEmReais = milho * dolarCotacao;
    const trigoEmReais = trigo * dolarCotacao;

    res.json({
      soja: { valor: soja, valorEmReais: sojaEmReais },
      milho: { valor: milho, valorEmReais: milhoEmReais },
      trigo: { valor: trigo, valorEmReais: trigoEmReais },
      dolar: dolarCotacao
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

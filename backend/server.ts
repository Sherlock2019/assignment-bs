<<<<<<< HEAD

=======
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435
// backend/src/server.ts
import express from 'express';
import WebSocket from 'ws';
import axios from 'axios';

const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const wss = new WebSocket.Server({ server });

async function fetchCryptoData() {
  try {
    // Fetch Ethereum price from CoinGecko
    const ethResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'ethereum',
        vs_currencies: 'usd'
      }
    });

    // Fetch gas price from Etherscan
    const gasResponse = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'gastracker',
        action: 'gasoracle',
        apikey: 'IZ8QIFDJA8PZJW1FZSIXVXXS9M4RP6DZY6'
      }
    });

    // Extract the necessary data
    const ethPrice = ethResponse.data.ethereum.usd; // Ethereum price in USD
    const gasPrice = gasResponse.data.result; // Make sure to check this path in the actual response

    return { ethPrice, gasPrice };
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return {};
  }
}

function broadcastData() {
  fetchCryptoData().then(data => {
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
}

setInterval(broadcastData, 60000); // Update every 60 seconds

wss.on('connection', (socket: WebSocket) => {
  console.log('New client connected');
  broadcastData(); // Send data on new connection
});

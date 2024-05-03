"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/server.ts
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = 3000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const wss = new ws_1.default.Server({ server });
async function fetchCryptoData() {
    try {
        // Fetch Ethereum price from CoinGecko
        const ethResponse = await axios_1.default.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'ethereum',
                vs_currencies: 'usd'
            }
        });
        // Fetch gas price from Etherscan
        const gasResponse = await axios_1.default.get('https://api.etherscan.io/api', {
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
    }
    catch (error) {
        console.error('Error fetching crypto data:', error);
        return {};
    }
}
function broadcastData() {
    fetchCryptoData().then(data => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });
}
setInterval(broadcastData, 60000); // Update every 60 seconds
wss.on('connection', (socket) => {
    console.log('New client connected');
    broadcastData(); // Send data on new connection
});

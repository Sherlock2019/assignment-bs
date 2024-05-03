"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function fetchCryptoData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch Ethereum price from CoinGecko
            const ethResponse = yield axios_1.default.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'ethereum',
                    vs_currencies: 'usd'
                }
            });
            // Fetch gas price from Etherscan
          
            const gasResponse = yield axios_1.default.get('https://api.etherscan.io/api', {
                params: {
                    module: 'gastracker',
                    action: 'gasoracle',
                    apikey: 'IZ8QIFDJA8PZJW1FZSIXVXXS9M4RP6DZY6' 
                }
            });

            // normally in production i would mask the api key by Fetching the API key from an environment variable
            //const API_KEY = process.env.ETHERSCAN_API_KEY;
            //export ETHERSCAN_API_KEY=your_api_key_here

        
            // Extract the necessary data
            const ethPrice = ethResponse.data.ethereum.usd; // Ethereum price in USD
            const gasPrice = gasResponse.data.result; // Make sure to check this path in the actual response
            return { ethPrice, gasPrice };
        }
        catch (error) {
            console.error('Error fetching crypto data:', error);
            return {};
        }
    });
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

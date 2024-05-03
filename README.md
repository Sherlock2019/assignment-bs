# Building a Real-Time Ethereum Price and Gas Tracker USER GUIDE
author : Dzoan Steven tran email : Doansteventran@gmail.com 


#Goal :
Building a Real-Time Ethereum Price and Gas Tracker This guide provides step-by-step instructions on how to build the application, encompassing both backend and frontend development.


#  Prerequisites: 

 - Node.js	16.x or 18.x	Runtime environment for running JavaScript on  
   the server	  LTS versions are recommended for stability and support.
 - npm	8.x	Package manager for JavaScript	Comes bundled with Node.js
 - Git	Latest	Version control system	Necessary for source code    management and collaboration.
 - Docker	20.10.x or newer	Platform for developing, shipping, and    running applications	Ensures consistent environments across  development stages
 - TypeScript	4.x	Superset of JavaScript providing type safety	Optional    but recommended for large projects
 - Webpack	5.x	Module bundler for JavaScript applications	Optional,    depends on project requirements.
 - React	17.x or 18.x	JavaScript library for building user    interfaces	Choose the version based on compatibility with other  tools
 - Next.js	12.x or 14.x	React framework for production	Use the latest    stable release for new projects.

# Project Setup:

 1. Create a GitHub Repository: Create a new private repository on
    GitHub named assignment-bs. Add any necessary collaborators (e.g.,
    @kennysliding and @dark5tarx). Clone the repository to your local
    machine using Git:

git clone https://github.com/your-username/assignment-bs.git

 2. Project Structure: Create the following directory structure within
    the cloned repository:

```
assignment-bs/
    backend/
        src/
            server.ts
            // ... other backend files (if needed)
        package.json
        tsconfig.json
    frontend/
        pages/
            index.tsx 
        // ... other frontend files and components (if needed)
        package.json
        tsconfig.json
README.md
```

 3. Install Dependencies:

 Navigate to the backend directory and install the required dependencies:
npm install next react react-dom socket.io-client
Backend Development: 

Create server.ts: In the backend/src directory, create a file named server.ts and add the following code:

```

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
```

Implement Data Fetching: Choose your preferred method for fetching gas price data (Etherscan Gas Tracker scraping or ETH Gas Station API).

Implement the logic for fetching data from the chosen source and extracting the necessary values within the fetchCryptoData function.
Consider adding data validation and error handling as discussed previously.


# Frontend Development: 

Create pages/index.tsx:


In the frontend/pages directory, create a file named index.tsx and add the following code:

```

import { useEffect, useState } from 'react';

// Define the types for gas price
interface GasPrice {
  LastBlock: string | null;
  SafeGasPrice: string | null;
  ProposeGasPrice: string | null;
  FastGasPrice: string | null;
  suggestBaseFee: string | null;
  gasUsedRatio: string | null;
}

// Define the type for the overall data state
interface DataState {
  ethPrice: number | null;
  gasPrice: GasPrice;
}

export default function Home() {
  // Set the initial state based on the expected data structure
  const [data, setData] = useState<DataState>({
    ethPrice: null,
    gasPrice: {
      LastBlock: null,
      SafeGasPrice: null,
      ProposeGasPrice: null,
      FastGasPrice: null,
      suggestBaseFee: null,
      gasUsedRatio: null
    }
  });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socket.onmessage = (event) => {
      try {
        const receivedData: DataState = JSON.parse(event.data);
        setData({
          ethPrice: receivedData.ethPrice,
          gasPrice: {
            LastBlock: receivedData.gasPrice.LastBlock,
            SafeGasPrice: receivedData.gasPrice.SafeGasPrice,
            ProposeGasPrice: receivedData.gasPrice.ProposeGasPrice,
            FastGasPrice: receivedData.gasPrice.FastGasPrice,
            suggestBaseFee: receivedData.gasPrice.suggestBaseFee,
            gasUsedRatio: receivedData.gasPrice.gasUsedRatio
          }
        });
      } catch (error) {
        console.error('Error parsing data:', error);
      }
    };
    return () => socket.close(); // Clean up the socket when the component unmounts
  }, []);

  // Function to render Ethereum price
  function renderEthPrice(ethPrice: number | null): string {
    if (!ethPrice) return 'Loading...';
    return `${ethPrice} USD`;
  }

  // Function to render gas price
  function renderGasPrice(gasPrice: GasPrice): JSX.Element {
    if (!gasPrice) return <p>Loading...</p>;
    return (
      <div>
        <p>Last Block: {gasPrice.LastBlock || 'Loading...'}</p>
        <p>Safe Gas Price: {gasPrice.SafeGasPrice || 'Loading...'} Gwei</p>
        <p>Proposed Gas Price: {gasPrice.ProposeGasPrice || 'Loading...'} Gwei</p>
        <p>Fast Gas Price: {gasPrice.FastGasPrice || 'Loading...'} Gwei</p>
        <p>Suggested Base Fee: {gasPrice.suggestBaseFee || 'Loading...'} Gwei</p>
        <p>Gas Used Ratio: {gasPrice.gasUsedRatio || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Crypto Prices</h1>
      <p>Ethereum Price: {renderEthPrice(data.ethPrice)}</p>
      <h2>Gas Prices</h2>
      {renderGasPrice(data.gasPrice)}
    </div>
  );
}

```

# Implement WebSocket Connection:

Use socket.io-client or the built-in WebSocket API to establish a connection to your backend server. 

Handle Data and Update State: In the useEffect hook, set up a listener for incoming messages from the WebSocket.

Parse the JSON data and update the state variables ethPrice and gasPrice with the received values.

Design the UI: Create the UI elements to display the Ethereum price and gas prices for different speeds. Use HTML elements, CSS styling, and potentially additional React components to create a clear and user-friendly interface.

# Testing and Running the Application:

 Start the Backend Server: In the backend directory, run npm start or yarn start to start your Node.js server. 
 
 Start the Frontend Development Server: In the frontend directory, run npm run dev or yarn dev to start the Next.js 
development server. 

# Access the Application:
 Open your browser and navigate to http://localhost:3001 (or the port where your Next.js server is running) to access the application.

Verify Functionality: Ensure that the Ethereum price and gas prices are being displayed correctly and updated in real-time as the backend sends new data. Test the application thoroughly and address any issues you encounter. 
so this is it for a local deployment and it should gives you this

Back End :https://websocketking.com/

```
18:58 20.02 { "ethPrice": 2991.07, "gasPrice": { "LastBlock": "19782287", "SafeGasPrice": "8", "ProposeGasPrice": "9", "FastGasPrice": "11", "suggestBaseFee": "7.994966246", "gasUsedRatio": "0.395591633333333,0.505830233333333,0.654276033333333,0.703146766666667,0.3398607" } } 17:29 14.27 { "ethPrice": 2944.91, "gasPrice": { "LastBlock": "19781844", "SafeGasPrice": "7", "ProposeGasPrice": "7", "FastGasPrice": "9", "suggestBaseFee": "6.930921316", "gasUsedRatio": "0.5845133,0.4052553,0.0566691,0.999673733333333,0.644321333333333" } }
17:28 14.22 { "ethPrice": 2944.91, "gasPrice": { "LastBlock": "19781839", "SafeGasPrice": "7", "ProposeGasPrice": "7", "FastGasPrice": "9", "suggestBaseFee": "6.708466761", "gasUsedRatio": "0.539835633333333,0.367459766666667,0.999733,0.503076966666667,0.478914933333333" } }
```

Front End http://localhost:3001/
```
Crypto Prices
Ethereum Price: 2991.07 USD

Gas Prices:
Standard: 9 Gwei

Fast: 12 Gwei

Instant: 10 Gwei
```



#  Troubleshooting

Most issue comes from Module versions , Variables naming .
You might run like me into this error , the FE would not show the GAS price . so check the Gas value front your Back end :
```
"ethPrice": 2944.91, "gasPrice": { "LastBlock": "19781844", "SafeGasPrice": "7", "ProposeGasPrice": "7", "FastGasPrice": "9", "suggestBaseFee": "6.930921316", "gasUsedRatio": "0.5845133,0.4052553,0.0566691,0.999673733333333,0.644321333333333" }

```
and make sure the front end components Index.js , App. js are using the sames Gas key values : Standard: {gasPrice.standard} Gwei Fast: {gasPrice.fast} Gwei Instant: {gasPrice.instant} Gwei and not loose 2 hours debugging like me !


# Deployement of Docker user guide is in the Docker Folder

#  Deployment on AWS/Amplify/Cloudflare user guide in the Cloud Folder

Hope you enjoy this ! 

// frontend/src/EthereumData.js

import React, { useState, useEffect } from 'react';
import connectToWebSocketServer from './WebSocketClient'; // Adjust the import path as needed

const EthereumData = () => {
  const [price, setPrice] = useState(null);
  const [gasFee, setGasFee] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection when component mounts
    const socket = connectToWebSocketServer();

    // Listen for updates from the WebSocket connection
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.ethereumPrice);
      //setGasFee(data.gasFee);
      setGasFee(data.gasPrice.SafeGasPrice);
    });

    // Clean up function to close WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>Real-time Ethereum Data</h2>
      <p>Ethereum Price: {price}</p>
      //<p>Gas Fee: {gasFee}</p>
      <p>Gas Fee: {gasFee} Gwei</p>
      
    </div>
  );
};


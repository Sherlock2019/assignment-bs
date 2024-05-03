import React, { useEffect, useState } from 'react';
import socket from './WebSocketClient';

function App() {
  const [ethPrice, setEthPrice] = useState(null);
  const [gasPrice, setGasPrice] = useState({
    standard: null,
    fast: null,
    instant: null
  });

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEthPrice(data.ethPrice);
      // Update gas price state using correct keys
      setGasPrice({
        standard: data.gasPrice.SafeGasPrice,
        fast: data.gasPrice.FastGasPrice,
        instant: data.gasPrice.ProposeGasPrice // Or use another appropriate key
      });
    };
  }, []);

  return (
    
      <h1>Ethereum Price: ${ethPrice}</h1>
      <h2>Gas Prices:</h2>
      <p>Standard: {gasPrice.SafeGasPrice} Gwei</p>
      <p>Fast:  {gasPrice.FastGasPrice} Gwei</p>
      <p>Instant: {gasPrice.ProposeGasPrice} Gwei</p>
    
  );
}

export default App;

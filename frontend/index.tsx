// frontend/pages/index.tsx
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ ethPrice: null, gasPrice: null });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socket.onmessage = event => {
      const receivedData = JSON.parse(event.data);
      setData({
        ethPrice: receivedData.ethPrice,
        gasPrice: receivedData.gasPrice // Assuming gasPrice is an object with standard, fast, and instant properties
      });
    };
    return () => socket.close();
  }, []);
  
  function renderEthPrice(ethPrice) {
    if (!ethPrice) return 'Loading...';
    // Assuming ethPrice is a simple number representing the price
    return `${ethPrice} USD`;
  }

  function renderGasPrice(gasPrice) {
    if (!gasPrice) return 'Loading...';
    // Assuming gasPrice is an object with properties for different gas types
    return (
      <div>
        <p>Standard: {gasPrice.standard} Gwei</p>
        <p>Fast: {gasPrice.fast} Gwei</p>
        <p>Instant: {gasPrice.instant} Gwei</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Crypto Prices</h1>
      <div>
        <p>Ethereum Price: {renderEthPrice(data.ethPrice)}</p>
        <div>
          <h2>Gas Prices:</h2>
          {renderGasPrice(data.gasPrice)}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ ethPrice: null, gasPrice: null });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socket.onmessage = event => {
      const receivedData = JSON.parse(event.data);
      setData({
        ethPrice: receivedData.ethPrice,
        gasPrice: {
          standard: receivedData.gasPrice.SafeGasPrice,
          fast: receivedData.gasPrice.FastGasPrice,
          instant: receivedData.gasPrice.ProposeGasPrice
        }
      });
    };
    return () => socket.close();
  }, []);

  function renderEthPrice(ethPrice) {
    if (!ethPrice) return 'Loading...';
    return `${ethPrice} USD`;
  }

  function renderGasPrice(gasPrice) {
    if (!gasPrice) return 'Loading...';
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

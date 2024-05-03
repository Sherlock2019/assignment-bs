import { useEffect, useState } from 'react';

<<<<<<< HEAD
export default function Home() {
  const [data, setData] = useState({ ethPrice: null, gasPrice: null });
=======
// Define the types for your state
interface GasPrice {
  LastBlock: string | null;
  SafeGasPrice: string | null;
  ProposeGasPrice: string | null;
  FastGasPrice: string | null;
  suggestBaseFee: string | null;
  gasUsedRatio: string | null;
}

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
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socket.onmessage = event => {
<<<<<<< HEAD
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
=======
      // Parse incoming data and update state
      setData(JSON.parse(event.data));
    };
    return () => socket.close(); // Clean up the socket when the component unmounts
  }, []);

  // Ensure that 'ethPrice' parameter is typed as 'number | null'
  function renderEthPrice(ethPrice: number | null): string {
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435
    if (!ethPrice) return 'Loading...';
    return `${ethPrice} USD`;
  }

<<<<<<< HEAD
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
=======
  return (
    <div>
      <h1>Crypto Prices</h1>
      <p>Ethereum Price: {renderEthPrice(data.ethPrice)}</p>
      <h2>Gas Prices</h2>
      <p>Last Block: {data.gasPrice.LastBlock || 'Loading...'}</p>
      <p>Safe Gas Price: {data.gasPrice.SafeGasPrice || 'Loading...'} Gwei</p>
      <p>Proposed Gas Price: {data.gasPrice.ProposeGasPrice || 'Loading...'} Gwei</p>
      <p>Fast Gas Price: {data.gasPrice.FastGasPrice || 'Loading...'} Gwei</p>
      <p>Suggested Base Fee: {data.gasPrice.suggestBaseFee || 'Loading...'} Gwei</p>
      <p>Gas Used Ratio: {data.gasPrice.gasUsedRatio || 'Loading...'}</p>
>>>>>>> efb370549b15432c5c98d75886a460616a5cf435
    </div>
  );
}

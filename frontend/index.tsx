import { useEffect, useState, useRef } from 'react';

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
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket('wss://localhost:3000');
    socketRef.current.onmessage = event => {
      try {
        setData(JSON.parse(event.data));
      } catch (err) {
        console.error('Error parsing message from server:', err);
        setError('Error fetching data.');
      }
    };

    socketRef.current.onerror = error => {
      console.error('WebSocket error:', error);
      setError('Connection error.');
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setError('Connection closed.');
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  function renderEthPrice(ethPrice: number | null): string {
    if (!ethPrice) return 'Loading...';
    return `${ethPrice} USD`;
  }

  return (
    <div>
      <h1>Crypto Prices</h1>
      {error ? <p>Error: {error}</p> : (
        <>
          <p>Ethereum Price: {renderEthPrice(data.ethPrice)}</p>
          <h2>Gas Prices</h2>
          <p>Last Block: {data.gasPrice.LastBlock || 'Loading...'}</p>
          <p>Safe Gas Price: {data.gasPrice.SafeGasPrice || 'Loading...'} Gwei</p>
          <p>Proposed Gas Price: {data.gasPrice.ProposeGasPrice || 'Loading...'} Gwei</p>
          <p>Fast Gas Price: {data.gasPrice.FastGasPrice || 'Loading...'} Gwei</p>
          <p>Suggested Base Fee: {data.gasPrice.suggestBaseFee || 'Loading...'} Gwei</p>
          <p>Gas Used Ratio: {data.gasPrice.gasUsedRatio || 'Loading...'}</p>
        </>
      )}
    </div>
  );
}


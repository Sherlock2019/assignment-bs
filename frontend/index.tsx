import { useEffect, useState, useCallback } from 'react';

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

  const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3000');

  useEffect(() => {
    socket.onmessage = event => {
      try {
        setData(JSON.parse(event.data));
      } catch (error) {
        console.error('Failed to parse message from server:', error);
      }
    };

    socket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = event => {
      console.log('WebSocket closed:', event.reason);
      // Optionally try to reconnect or inform the user
    };

    return () => socket.close();
  }, []);

  const renderEthPrice = useCallback((ethPrice: number | null): string => {
    if (!ethPrice) return 'Loading...';
    return `${ethPrice} USD`;
  }, []);

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
    </div>
  );
}


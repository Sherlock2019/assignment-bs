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


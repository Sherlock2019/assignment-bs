import { useEffect, useState } from 'react';

export default function Home() {
  // Set the initial state based on the expected data structure
  const [data, setData] = useState({
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
    socket.onmessage = event => {
      // Parse incoming data and update state
      setData(JSON.parse(event.data));
    };
    return () => socket.close(); // Clean up the socket when the component unmounts
  }, []);

  return (
    <div>
      <h1>Crypto Prices</h1>
      <p>Ethereum Price: ${data.ethPrice}</p>
      <h2>Gas Prices</h2>
      <p>Last Block: {data.gasPrice.LastBlock}</p>
      <p>Safe Gas Price: {data.gasPrice.SafeGasPrice} Gwei</p>
      <p>Proposed Gas Price: {data.gasPrice.ProposeGasPrice} Gwei</p>
      <p>Fast Gas Price: {data.gasPrice.FastGasPrice} Gwei</p>
      <p>Suggested Base Fee: {data.gasPrice.suggestBaseFee} Gwei</p>
      <p>Gas Used Ratio: {data.gasPrice.gasUsedRatio}</p>
    </div>
  );
}

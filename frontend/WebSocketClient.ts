// WebSocketClient.js

/**
 * Function to connect to the WebSocket server.
 * @returns {WebSocket} WebSocket connection instance.
 */
const connectToWebSocketServer = () => {
  const serverUrl = 'ws://localhost:8080'; // Consider using environment variables to manage this URL.
  const socket = new WebSocket(serverUrl);

  // Event listener for WebSocket connection open
  socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server:', serverUrl);
  });

  // Event listener for WebSocket messages received
  socket.addEventListener('message', (event) => {
    try {
      const receivedData = JSON.parse(event.data);
      console.log('Message from server:', receivedData);
      // Handle the received message from the server, e.g., update UI
    } catch (error) {
      console.error('Error parsing message from server:', error);
    }
  });

  // Event listener for WebSocket connection close
  socket.addEventListener('close', (event) => {
    console.log('Disconnected from WebSocket server. Code:', event.code, 'Reason:', event.reason);
  });

  // Event listener for WebSocket connection errors
  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return socket;
};

export default connectToWebSocketServer;


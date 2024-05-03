// WebSocketClient.js

// Function to connect to the WebSocket server
const connectToWebSocketServer = () => {
  const socket = new WebSocket('ws://localhost:8080'); // Replace 'localhost:8080' with your backend server address

  // Event listener for WebSocket connection open
  socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
  });

  // Event listener for WebSocket messages received
  socket.addEventListener('message', (event) => {
    console.log('Message from server:', event.data);
    // Handle the received message from the server, e.g., update UI

    // Log the received data
    const receivedData = JSON.parse(event.data);
    console.log('Received data:', receivedData);
  });

  // Event listener for WebSocket connection close
  socket.addEventListener('close', () => {
    console.log('Disconnected from WebSocket server');
  });

  // Event listener for WebSocket connection errors
  socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return socket;
};

export default connectToWebSocketServer;

// WebSocketClient.js

const socket = new WebSocket('ws://localhost:8080'); // Replace 'localhost:8080' with your backend server address

// Event listener for WebSocket connection open
socket.addEventListener('open', () => {
  console.log('Connected to WebSocket server');
});

// Event listener for WebSocket connection close
socket.addEventListener('close', () => {
  console.log('Disconnected from WebSocket server');
});

// Event listener for WebSocket connection errors
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

export default socket;

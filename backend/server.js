const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { tokens, generateMockUpdates } = require('./mockData');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// REST API
app.get('/api/tokens', (req, res) => {
    res.json(generateMockUpdates()); // Return current state
});

// WebSocket
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send initial data
    ws.send(JSON.stringify({ type: 'init', data: generateMockUpdates() }));

    const interval = setInterval(() => {
        const updates = generateMockUpdates();
        ws.send(JSON.stringify({ type: 'update', data: updates }));
    }, 1000); // 1 update per second

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Load your self-signed certificate and key
const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl-certificates', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl-certificates', 'server.crt'))
};

// Serve static files from the 'phone' directory
app.use('/phone', express.static(path.join(__dirname, 'phone')));

// Serve static files from 'img' and 'sounds' directories
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/sounds', express.static(path.join(__dirname, 'sounds')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the login.html page
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'phone', 'login.html'));
});

// Serve the dev.html page
app.get('/dev.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'phone', 'dev.html'));
});

// Example API route (if needed)
app.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example API route.' });
});

// Start the HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server is running on https://localhost:${port}`);
});

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Proxy endpoint

app.get("/", (req, res) => {
    res.status(200).json("Server Start");
});
app.get('/proxy', async (req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).send('URL parameter is required');
        }

        const response = await fetch(url);
        const data = await response.text();

        res.send(data);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred');
    }
});

// Fetch data from hianime.to URL
app.get('/api/v1/schedule', async (req, res) => {
    try {
        const { date } = req.query;
        const url = `https://hianime.to/ajax/schedule/list?tzOffset=-330&date=${date}`;
        const response = await fetch(url);
        const data = await response.text();

        res.send(data);
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('An error occurred');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

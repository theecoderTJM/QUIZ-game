const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve questions JSON
app.get('/questions', (req, res) => {
    fs.readFile(path.join(__dirname, 'data/questions.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading questions file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

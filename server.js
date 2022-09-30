const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Get Route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Route for note page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// Wildcard Route to direct users to a 404 page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
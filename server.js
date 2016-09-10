const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getChunks = require('./src/get-chunks');

app.use(bodyParser.json());
app.post('/process', (request, response) => {
    const endpoint = request.body.endpoint;
    const userAgent = request.headers['user-agent'];
    return getChunks(endpoint, userAgent)
        .then((chunkObj) => {
            response.json(chunkObj);
        }).catch((err) => {
            response.set('Content-Type', 'text/plain');
            response.status(500).send(err.message);
        });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000);
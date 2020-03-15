const express = require('express'),
    functions = require('firebase-functions'),
    bodyParser = require('body-parser'),
    users = require('./controllers/users'),
    app = express(),
    cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use('/users', users);

export const webApi = functions.https.onRequest(app);

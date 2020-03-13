const express = require('express'),
    functions = require('firebase-functions'),
    bodyParser = require('body-parser'),
    users = require('./controllers/users'),
    app = express();
app.use(bodyParser.json());

app.use('/users', users);

export const webApi = functions.https.onRequest(app);

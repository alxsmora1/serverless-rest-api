const functions = require("firebase-functions");
const express = require('express');
const mongoose = require('mongoose');

const mongooseConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
};
mongoose.connect('CONNECTION_STRING', mongooseConfig);

const app = express();

const Pets = require('./pets');

const createServer = () => {
    app.get('/pets', async (req, res) => {
        const result = await Pets.find({}).exec();

        res.send(result);
    });
    
    app.post('/pets', async (req, res) => {
        const { body } =  req;

        const pet = new Pets(body);
        await pet.save();
        res.sendStatus(204);
    });

    app.get('/pets/:id/daralta', (req, res) => {
        res.send('dar alta');
    });

    return app;
}

exports.api = functions.https.onRequest(createServer());

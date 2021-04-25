const functions = require("firebase-functions");
const express = require('express');
const mongoose = require('mongoose');

const mongooseConfig = { useNewUrlParser: true };
mongoose.connect('CONNECTION_STRING', mongooseConfig);

const app = express();

const Pets = require('./pets');

const createServer = () => {
    app.get('/pets', async (req, res) => {
        //const pet = new Pets({
        //    nombre: 'Cerdito feliz',
        //    tipo: 'Cerdo',
        //    descripcion: 'Esta triste porque su amigo no para de comer',
        //});

        //pet.save();
        
        const result = await Pets.find({}).exec();

        res.send(result);
    });
    
    app.post('/pets', (req, res) => {
        res.send('creando una mascota');
    });

    app.get('/pets/:id/daralta', (req, res) => {
        res.send('dar alta');
    });

    return app;
}

exports.api = functions.https.onRequest(createServer());

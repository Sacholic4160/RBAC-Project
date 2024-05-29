require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://sachinparmar4160:PUa3h894kCUcUgVQ@cluster-rbac.hqbujw5.mongodb.net/')
    .then(connectionInstance => {
        console.log(`mongodb connected successfully on: ${connectionInstance.connection.host}`);

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

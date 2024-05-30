require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./router/auth.route.js');
const adminRoute = require('./router/admin.route.js')

const app = express();
app.use(express.static('public'));
app.use(express.json()) // here if we have express version below 4.16 then we have install dependency like body-parser to read json but in about versions it is inbuilt in express
app.use('/api/authUser', authRoute);
app.use('/api/admin', adminRoute)
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://sachinparmar4160:PUa3h894kCUcUgVQ@cluster-rbac.hqbujw5.mongodb.net/RBAC-db')
    .then(connectionInstance => {
        console.log(`mongodb connected successfully on: ${connectionInstance.connection.host}`);

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

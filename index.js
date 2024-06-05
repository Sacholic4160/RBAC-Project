require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');




const verifyJWT = require('./middleware/auth.middleware.js');
const onlyAdminAccess = require('./middleware/admin.middleware.js');

const app = express();
app.use(express.static('public'));
app.use(express.json()) // here if we have express version below 4.16 then we have install dependency like body-parser to read json but in about versions it is inbuilt in express

//auth route
const authRoute = require('./router/auth.route.js');
app.use('/api/authUser', authRoute);

//admin route
const adminRoute = require('./router/admin.route.js')
app.use('/api/admin', adminRoute)

//common route
const commonRoute = require('./router/common.route.js');
app.use('/api', commonRoute)

//getting all routes route
const { getAllRoutes } = require('./controller/admin/router.controller.js');
app.get('/api/admin/all-Routes', verifyJWT, onlyAdminAccess, getAllRoutes)
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
// mongodb+srv://sachinparmar4160:PUa3h894kCUcUgVQ@cluster-rbac.hqbujw5.mongodb.net/
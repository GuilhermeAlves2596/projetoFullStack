var express = require('express');
var cors = require('cors')
var path = require('path');
require('dotenv').config();

var app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// var userRoutes = require('./routes/userRoutes')

// app.use('/user', userRoutes)


module.exports = app;
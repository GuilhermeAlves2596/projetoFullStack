var express = require('express');
var cors = require('cors')
var path = require('path');
require('dotenv').config();
var cookieParser = require('cookie-parser');

var app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var userRoutes = require('./routes/userRoutes')
var cardRoutes = require('./routes/cartaRoutes')

app.use('/user', userRoutes)
app.use('/card', cardRoutes)


module.exports = app;
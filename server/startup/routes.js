const express = require('express');

const auth = require('../routers/auth');

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded());

    app.use('/api/auth/', auth);
}
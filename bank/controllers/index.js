'use strict'

// import res sebagai response json dari server ini
var response = require('../res');
// import conn untuk akses database
var con = require('../db_connect');

// contoh implementasi endpoint
exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res);
};
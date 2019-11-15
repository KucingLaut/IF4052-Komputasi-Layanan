'use strict'

// import res sebagai response json dari server ini
var response = require('../res');
// import conn untuk akses database
var db = require('../db_connect');

exports.validate_card = function(req, res) {
    var card_num = req.query.card_num;
    console.log(card_num);
    var pool = db.getPool();
    pool.query('SELECT name FROM account WHERE card_number = $1;', [card_num], function(err, rows){
        if (err) { response.error(400, err, res); }
        else if (rows.length === 0) {
            response.error(400, false, res);
        } else {
            response.ok(true, res);
        }
    });
}
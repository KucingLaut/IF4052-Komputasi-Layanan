'use strict'

// import res sebagai response json dari server ini
var response = require('../res');
// import conn untuk akses database
var db = require('../db_connect');

exports.transfer = function(req, res){
    var acc_sender = req.body.acc_sender;
    var acc_receiver = req.body.acc_receiver;
    var amount = req.body.amount;

    var check_sender_balance = 'SELECT balance FROM account WHERE card_number = $1';
    var update_sender_balance = 'UPDATE account SET balance = balance - $1 WHERE card_number = $2';
    var update_receiver_balance = 'UPDATE account SET balance = balance + $1 WHERE card_number = $2';
    var insert_new_transaction = 'INSERT INTO transaction(acc_sender, acc_receiver, amount) VALUES ($1, $2, $3)';

    db.transaction(async client => {
        const { rows } = await client.query(check_sender_balance, [acc_sender]);
        const balance = rows[0].balance;
        if (balance > amount) {
            await client.query(update_sender_balance, [amount, acc_sender]);
            await client.query(update_receiver_balance, [amount, acc_receiver]);
            await client.query(insert_new_transaction, [acc_sender, acc_receiver, amount]);
        }
    }).then((status) => {
        if (status == -1) {
            res.status(500).send({'message': 'Error!'});
        } else if (status == 0 ) {
            res.status(200).send({
                'message': 'Success!',
                'acc_sender': acc_sender,
                'acc_receiver': acc_receiver,
                'amount': amount
            });
        }
    });
};
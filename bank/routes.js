'use strict'

module.exports = function(app) {
    var index = require('./controllers/index');
    var transaction = require('./controllers/transaction');
    var account = require('./controllers/account');
    // masukin semua file controller di sini

    //contoh endpoint
    app.route('/')
    .get(index.index);

    app.route('/transfer')
    .post(transaction.transfer);

    app.route('/auth')
    .get(account.validate_card);
}
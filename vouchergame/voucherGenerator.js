var crypto = require("crypto");
const pool = require('./queries');

exports.generate = function(req, res) {
    var amount = req.body.amount;
    if (amount == undefined) {
        var err = {'msg': 'Please define an amount.'}
        res.status(400).send(err);
    } else {
        var code = '';
        do {
            code = crypto.randomBytes(10).toString('hex');
            var result = new Promise( (resolve)  => {
                pool.query('SELECT code FROM voucher WHERE code = $1::text', [code], (error, result) => {
                    if (error) {
                        res.status(500).send({'msg': "Service unavailable at this moment."});
                    } else {
                        resolve(result);
                    }
                })
            });
        } while (result.rowCount > 0);
        var result = pool.query('INSERT INTO voucher(code, value, redeemed) VALUES ($1, $2, $3)', [code, amount, true], (error, result) => {
            if (error) {
                res.status(500).send({'msg': "Service unavailable at this moment."});
            } else {
                var data = {'voucher_code': code}
                res.status(200).send(data);
            }
        });
    }
}
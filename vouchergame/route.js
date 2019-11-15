const generator = require('./voucherGenerator')

module.exports = (app) => {
    app.get('/', function(req, res) {
        res.send('Hello world!');
    });
    app.post('/getVoucher', generator.generate);
}
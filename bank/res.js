'use strict'

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'values' : values,
    };
    res.json(data);
    res.end();
};

exports.error = function(error_code, error_msg, res) {
    var data = {
        'status': error_code,
        'values' : error_msg
    };
    res.json(data);
    res.end();
}
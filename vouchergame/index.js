const express = require('express');
const bodyParser = require('body-parser');
const port = 7000;

const route = require('./route');

var app = express();
app.use(bodyParser.json())

route(app)

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
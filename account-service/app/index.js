const app = require('express')();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require('app/routes'));

app.use(require('app/middlewares/error-handler'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Started at ${new Date().toUTCString()}`);
});

module.exports = app;

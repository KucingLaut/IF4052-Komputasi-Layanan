const app = (module.exports = require('express')());
const errorHandler = require('app/utils/custom_error');

app.get('/', (req, res) => {
  res.json({ timestamp: Date.now() });
});

var usersRouter = require('app/routes/user');
var adminRouter = require('app/routes/admin');
var authRouter = require('app/routes/authentication');

app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.use(errorHandler);

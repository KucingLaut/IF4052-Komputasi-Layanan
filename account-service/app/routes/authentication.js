var express = require('express');
var router = express.Router();
var Task = require('app/actions/authentication');

const { assertNotNull } = require('app/utils/request-validator');

router.post('/email', async (req, res, next) => {
  try {
    assertNotNull(req.body, 'user_email');
    assertNotNull(req.body, 'password');

    let data = req.body;
    let result = await Task.authWithEmail(data);
    res.json({
      data: result
    });
  } catch (err) {
    next(err);
  }
});

router.post('/username', async (req, res, next) => {
  try {
    assertNotNull(req.body, 'username');
    assertNotNull(req.body, 'user_email');

    let data = req.body;
    let result = await Task.authWithUsername(data);
    res.json({
      data: result
    });
  } catch (err) {
    next(err);
  }
});

router.post('/validate', async (req, res, next) => {
  try {
    assertNotNull(req.body, 'token');

    let data = req.body;
    let result = await Task.validate(data);
    res.json({
      data: result
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

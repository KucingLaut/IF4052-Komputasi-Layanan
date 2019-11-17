var express = require('express');
var router = express.Router();
var Task = require('app/actions/admin');

const { assertNotNull, toInteger } = require('app/utils/request-validator');

router.get('/:id?', async (req, res, next) => {
  if (req.params.id) {
    try {
      let id = toInteger(req.params.id);

      let result = await Task.getAdminById(id);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  } else {
    try {
      let query = req.query;
      let result = await Task.getAllAdmins(query);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
});

router.post('/', async (req, res, next) => {
  try {
    assertNotNull(req.body, 'username');
    assertNotNull(req.body, 'password');
    assertNotNull(req.body, 'firstname');
    assertNotNull(req.body, 'lastname');

    let data = req.body;
    let result = await Task.addAdmin(data);
    res.json({
      data: { result }
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let id = toInteger(req.params.id);

    await Task.deleteAdmin(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let id = toInteger(req.params.id);
    assertNotNull(req.body, 'password');
    assertNotNull(req.body, 'firstname');
    assertNotNull(req.body, 'lastname');

    let data = req.body;
    await Task.updateAdmin(id, data);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

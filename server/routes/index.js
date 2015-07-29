var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var user = require('./users.js');
var instances = require('./instances.js');
/*
* Routes that can be accessed by any one
*/
router.post('/login', auth.login);

/*
* Routes that can be accessed only by authenticated & authorized users
*/
router.get('/computedashboard/admin/users', user.getAll);
router.get('/computedashboard/admin/user/:id', user.getOne);
router.post('/computedashboard/admin/user/', user.create);
router.put('/computedashboard/admin/user/:id', user.update);
router.delete('/computedashboard/admin/user/:id', user.delete);
/*
* Routes that can be accessed only by autheticated users
*/
router.get('/computedashboard/instances', instances.getAll);
module.exports = router;
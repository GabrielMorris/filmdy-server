// Express
const express = require('express');
const router = express.Router();

// Controllers
const UserController = require('../controllers/users.controller');

router.post('/', UserController.createNewUser);

module.exports = router;

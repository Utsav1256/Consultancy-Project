const express = require('express');
const router = express.Router();
console.log('Router loaded');

const usersController = require('../controllers/user_controller');
router.get('/profile', usersController.profile);

module.exports = router;

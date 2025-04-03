const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/users', userController.addUser);
router.get('/users', userController.getUsers);

module.exports = router;
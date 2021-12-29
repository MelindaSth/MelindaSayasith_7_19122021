const router = require('express').Router();

const userCtrl = require('../controllers/user.ctrl');

const auth = require('../middleware/auth');

// #1 Get all users
router.get('/users', userCtrl.getAllUsers);

// #2 Post newUser
router.post('/signup', userCtrl.signup);

// #3 Post to login
router.post('/login', userCtrl.login);

module.exports = router;
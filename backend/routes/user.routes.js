const router = require('express').Router();

const userCtrl = require('../controllers/user.ctrl');

// #1 Get all users
router.get('/users', userCtrl.getAllUsers);

// #2 Get post by id
router.get('/users/:id', userCtrl.getOneUser);

// #2 Post newUser
router.post('/signup', userCtrl.signup);

// #3 Post to login
router.post('/login', userCtrl.login);

// #4 Delete user by id
router.delete('/users/:id', userCtrl.deleteUser);

module.exports = router;
const router = require('express').Router();

const userCtrl = require('../controllers/user.ctrl');
const auth = require('../middleware/auth');

// #1 Get all users
router.get('/users', userCtrl.getAllUsers);

// #2 Get post by id
router.get('/users/:id', userCtrl.getOneUser);

// #3 Post newUser
router.post('/signup', userCtrl.signup);

// #4 Post to login
router.post('/login', userCtrl.login);

// #5 Delete user by id
router.delete('/users/:id', auth, userCtrl.deleteUser);

// #6 Update user by id
router.put('/users/:id', auth, userCtrl.modifyUser)

module.exports = router;
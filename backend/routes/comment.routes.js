const router = require('express').Router();

const commentCtrl = require('../controllers/comment.ctrl');

// #1 Post 'post'
router.post('/comment', commentCtrl.createComment);

// #2 Delete comment by id
router.delete('/comment/:id', commentCtrl.deleteComment);

// #3 Modify comment by id
router.patch('/comment/:id', commentCtrl.modifyComment);

module.exports = router;

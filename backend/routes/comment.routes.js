const router = require('express').Router();

const commentCtrl = require('../controllers/comment.ctrl');

// #1 get 'AllCommentsOfPost'
router.get('/comment/:id', commentCtrl.getAllCommentOfPost);

// #2 Post 'post'
router.post('/comment', commentCtrl.createComment);

// #3 Delete comment by id
router.delete('/comment/:id', commentCtrl.deleteComment);

// #4 Modify comment by id
router.patch('/comment/:id', commentCtrl.modifyComment);

module.exports = router;

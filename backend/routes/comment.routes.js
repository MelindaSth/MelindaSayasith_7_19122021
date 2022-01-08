const router = require('express').Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment.ctrl');

// #1 get 'AllCommentsOfPost'
router.get('/comment/:id', commentCtrl.getAllCommentOfPost);

// #2 Post 'post'
router.post('/comment', auth, commentCtrl.createComment);

// #3 Delete comment by id
router.delete('/comment/:id', auth, commentCtrl.deleteComment);

// 
router.delete('/comment/post/:id', auth, commentCtrl.deleteAllcommentOfPost)

// #4 Modify comment by id
router.patch('/comment/:id', auth, commentCtrl.modifyComment);

module.exports = router;




const { uploadPost, createPost, updatePost, getOnePost, getAllPost, checkAuthor, getUserPosts, deleteOnePost } = require('../controllers/postController');
const { checkLogin } = require('../middlewares/auth');
const { upload } = require('../services/postServices');
const router = require('express').Router();

router.post('/createPost', checkLogin, upload.array('postImage'), createPost);
router.get('/get-one-post/:postId', getOnePost);
router.get('/get-all-posts', getAllPost);
router.patch('/update-post/:postId', checkLogin, upload.array('postImage'), updatePost);
router.get('/check-author/:authorId/:postId', checkAuthor);
router.get('/get-user-posts', checkLogin, getUserPosts);
router.delete('/delete-one-post/:postId', checkLogin, deleteOnePost);

module.exports = router;
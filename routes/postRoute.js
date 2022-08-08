const { uploadPost, createPost } = require('../controllers/postController');
const { checkLogin } = require('../middlewares/auth');
const { upload } = require('../services/postServices');
const router = require('express').Router();

router.post('/createPost', checkLogin, upload.array('postImage') ,createPost);

module.exports = router;
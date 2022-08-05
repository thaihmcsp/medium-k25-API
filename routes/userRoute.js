const { getOneUser, updateUserInfo, changePassword } = require('../controllers/userController');
const { checkLogin } = require('../middlewares/auth');
const { upload } = require('../services/userServices');
const router = require('express').Router();

router.get('/get-one-user/:userId', getOneUser);
router.patch('/update-user-info/:userId', checkLogin, upload.single('avatar'), updateUserInfo);
router.patch('/change-password', checkLogin, changePassword);

module.exports = router;
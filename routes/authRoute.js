const { register, login, getLogInUser } = require('../controllers/authController');
const { checkLogin } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', checkLogin, getLogInUser);

module.exports = router;
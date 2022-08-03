const router = require('express').Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const blockRoute = require('./blockRoute');
const categoryRoute = require('./categoryRoute');
const followRoute = require('./followRoute');
const postRoute = require('./postRoute');

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/block', blockRoute);
router.use('/category', categoryRoute);
router.use('/follow', followRoute);
router.use('/post', postRoute);

//category - controler
router.use("/category", categoryRoute);










module.exports = router;
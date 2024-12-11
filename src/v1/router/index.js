const { Router } = require('express');
const router = new Router();

router.use('/auth',  require('./authRoute'));
router.use('/admin',  require('./adminRoute'));
router.use('/users',  require('./userRoute'));

module.exports = router;
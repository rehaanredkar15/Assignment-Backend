const { Router } = require('express');
const router = new Router();

router.use('/auth',  require('./authRoute'));

module.exports = router;
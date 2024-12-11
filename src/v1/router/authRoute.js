const express = require('express');
const { authenticateToken, authorizeRole } = require('../helpers/auth-middleware');
const { registerUser, loginUser,getUsers } = require('../controller/user-controller');
const { refreshToken } = require('../controller/auth-controller');
const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);


module.exports = router;

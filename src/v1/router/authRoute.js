const express = require('express');
const { authenticateToken, authorizeRole } = require('../helpers/auth-middleware');
const { registerUser, loginUser,getUsers } = require('../controller/user-controller');
const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes
// router.post('/kyc', authenticateToken, submitKYC);
router.get('/admin/users', authenticateToken, authorizeRole(['admin']), getUsers);
// router.put('/admin/kyc/:id', authenticateToken, authorizeRole(['admin']), updateKYCStatus);

module.exports = router;

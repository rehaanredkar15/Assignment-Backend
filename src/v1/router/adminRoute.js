const express = require('express');
const { authenticateToken, authorizeRole } = require('../helpers/auth-middleware');
const { getUsers, updateUserKycStatus } = require('../controller/admin-controller');
const { fetchUserDetails } = require('../controller/user-controller');
const router = express.Router();

//Protected Route
router.get('/users', authenticateToken, authorizeRole(['admin']), getUsers);
router.put('/update-kyc/:userId', authenticateToken, authorizeRole(['admin']), updateUserKycStatus);
router.get('/user-details', authenticateToken, fetchUserDetails);

module.exports = router;
const express = require('express');
const { authenticateToken, authorizeRole } = require('../helpers/auth-middleware');
const { getUsers } = require('../controller/admin-controller');
const router = express.Router();

router.get('/users', authenticateToken, authorizeRole(['admin']), getUsers);
// router.put('/kyc/:id', authenticateToken, authorizeRole(['admin']), updateKYCStatus);

module.exports = router;
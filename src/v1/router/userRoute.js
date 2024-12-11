const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateToken, authorizeRole } = require('../helpers/auth-middleware');
const { registerUser, loginUser,getUsers, uploadKycFile, fetchUserDetails } = require('../controller/user-controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to filenames
    },
  });
const upload = multer({ storage: storage });

router.post('/upload-kyc', upload.single('kycFile'), uploadKycFile);
// router.put('/kyc/:id', authenticateToken, authorizeRole(['admin']), updateKYCStatus);
router.get('/user-details', authenticateToken, fetchUserDetails);

module.exports = router;
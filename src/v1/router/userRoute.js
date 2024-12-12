const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateToken, authorizeRole } = require('../helpers/auth-middleware');
const { registerUser,getUsers, uploadKycFile, fetchUserDetails } = require('../controller/user-controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });
const upload = multer({ storage: storage });

router.post('/upload-kyc', upload.single('kycFile'), uploadKycFile);
//Protected Route

module.exports = router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user-model.js');
const userService = require('../service/user-service');
const adminService = require('../service/admin-service');
const cloudinary = require('../../../config/cloudinary.config.js');
const fs = require('fs');
const path = require('path');

const registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        const { password, ...userData } = user._doc;

        res.status(201).json({ message: 'User registered successfully',user:userData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password, ...userData } = user._doc;

    res.json({
        token,
        user: userData
    });
};

const uploadKycFile = async (req, res) => {
    try {
      const { email,name } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
  
      const filePath = req.file.path;
  
      const updatedUser = await userService.uploadAndSaveKycDetails(filePath, email,name);
  
      res.status(200).json({
        message: 'File uploaded successfully and KYC details updated',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error in uploadKycFile:', error);
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };

  const fetchUserDetails = async (req, res) => {
    try {
      const { userId, email } = req.query; 

      if (!userId && !email) {
        return res.status(400).json({ message: 'Either userId or email must be provided.' });
      }
  
      const userDetails = await userService.getUserDetails({ userId, email });
  
      if (!userDetails) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({
        message: 'User details fetched successfully.',
        user: userDetails,
      });
    } catch (error) {
      console.error('Error in fetchUserDetails controller:', error);
      res.status(500).json({ message: 'An error occurred while fetching user details.', error: error.message });
    }
  };
  



module.exports = {
    registerUser,
    loginUser,
    uploadKycFile,
    fetchUserDetails
};
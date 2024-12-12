const User = require('../model/user-model.js');
const fs = require('fs');
const cloudinary = require('../../../config/cloudinary.config.js');

const uploadAndSaveKycDetails = async (filePath, email,name) => {
    try {
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',
      });
  
      // Deleting local file
      fs.unlinkSync(filePath);
  
      const updatedUser = await User.findOneAndUpdate(
        { email },
        {  
           name:name, 
           email:email,
          'kycDetails.documentPath': result.url, 
          'kycDetails.status': 'pending' 
        },
        { new: true } 
      );
  
      if (!updatedUser) {
        throw new Error('User not found');
      }
  
      return updatedUser;
    } catch (error) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new Error(`Error in uploadAndSaveKycDetails: ${error.message}`);
    }
};


const getUserDetails = async ({ userId, email }) => {
    try {
      const query = {};
      if (userId) query._id = userId;
      if (email) query.email = email;
  
      const user = await User.findOne(query);
  
      return user;
    } catch (error) {
      console.error('Error in getUserDetails service:', error);
      throw new Error('Failed to fetch user details.');
    }
  };

  
module.exports = { uploadAndSaveKycDetails,getUserDetails };
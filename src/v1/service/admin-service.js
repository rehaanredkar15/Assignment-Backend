const User = require('../model/user-model.js');

const getUsersData = async () => {
    try {
        const users = await User.find().select('name email role kycDetails.status');
        return users;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    }
};

const updateUserKycDetails = async (userId, updates) => {
    try {
      const { status, name, email } = updates;
  
      const updateFields = {
        ...(name && { name }), 
        ...(email && { email }), 
        'kycDetails.status': status, 
      };
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true, 
      });
  
      return updatedUser;
    } catch (error) {
      console.error('Error in updateUserKycDetails service:', error);
      throw new Error('Failed to update user KYC details');
    }
  };

module.exports = { getUsersData,updateUserKycDetails };
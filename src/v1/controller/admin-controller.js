const adminService = require('../service/admin-service');

const getUsers = async (req, res) => {
    try {
        const users = await adminService.getUsersData();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users: ' + err.message });
    }
};


const updateUserKycStatus = async (req, res) => {
    try {
      const { userId } = req.params; 
      const { status, name, email } = req.body; 
  
      if (!status || !['accepted', 'pending', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be "accepted", "pending", or "rejected".' });
      }
  
      const updatedUser = await adminService.updateUserKycDetails(userId, { status, name, email });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User KYC details updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error in updateUserKycStatus controller:', error);
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  };

module.exports = {
    getUsers,
    updateUserKycStatus
};
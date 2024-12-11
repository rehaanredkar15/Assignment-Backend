const User = require('../model/user-model.js');

// Service function to fetch all users with their KYC statuses
const getUsersData = async () => {
    try {
        const users = await User.find().select('name email role kycDetails.status');
        return users;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    }
};

module.exports = { getUsersData };
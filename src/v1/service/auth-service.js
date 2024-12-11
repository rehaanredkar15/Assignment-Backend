const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Function to generate the access and refresh token
const generateToken = async (user) => {
    try {
        // Verify if the user exists (simplified check, you can enhance this logic)
        const foundUser = await User.findOne({ email: user.email });
        if (!foundUser) {
            return { success: false, message: 'User not found' };
        }

        // Generate access token
        const accessToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  // Access token expiry in 1 hour
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }  // Refresh token expiry in 7 days
        );

        return { success: true, token: accessToken }; 
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error generating token' };
    }
};

module.exports = { generateToken };

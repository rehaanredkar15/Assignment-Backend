const jwt = require('jsonwebtoken');
const User = require('../model/user-model');

const generateToken = async (user) => {
    try {
        const foundUser = await User.findOne({ email: user.email });
        if (!foundUser) {
            return { success: false, message: 'User not found' };
        }

        const accessToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }  
        );

        const refreshToken = jwt.sign(
            { id: foundUser._id, role: foundUser.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' } 
        );

        return { success: true, token: accessToken }; 
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error generating token' };
    }
};

module.exports = { generateToken };

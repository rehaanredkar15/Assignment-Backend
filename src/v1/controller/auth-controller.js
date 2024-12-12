const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user-model');
const { generateToken } = require('../service/auth-service');

  const refreshToken = async (req, res) => {
    try {
        const { email } = req.body;  
        const user = { email };      
        const tokenResponse = await generateToken(user); 

        if (tokenResponse.success) {
            const { token } = tokenResponse;  
            res.status(200).json({ success: true, token, message: 'Token Generated' });
        } else {
            res.status(500).json({ error: 'Could not refresh token' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not refresh token' });
    }
};
  

module.exports = {
    refreshToken
};


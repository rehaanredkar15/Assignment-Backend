const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    kycDetails: {
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        documentPath: String,
    },
});

module.exports = mongoose.model('User', userSchema);

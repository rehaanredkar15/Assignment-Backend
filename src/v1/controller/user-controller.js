const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user-model.js');
const userService = require('../service/user-service');


const registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
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
    res.json({ token });
};


// Controller function to handle fetching users for the admin
const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsersData();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users: ' + err.message });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getUsers
};
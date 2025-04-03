const User = require('../models/User');

// Add a new user
exports.addUser = async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address || '',
            gender: req.body.gender || 'other'
        });

        await newUser.save();
        
        res.status(201).json({
            success: true,
            message: 'User added successfully',
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to add the user',
            error: error.message
        });
    }
};

// List all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: Unable to retrieve users',
            error: error.message
        });
    }
};
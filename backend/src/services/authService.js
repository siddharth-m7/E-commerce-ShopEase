const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (name, email, password, role) => {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
    });

    return user;
};

const loginUser = async (email, password)  => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email is not registered');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    return { user, token };

}



module.exports = {
    registerUser,
    loginUser
};
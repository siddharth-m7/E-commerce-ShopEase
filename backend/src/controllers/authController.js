const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        console.log(name, email, password, role);

        const userReg = await registerUser(name, email, password, role);

        console.log("User registered:", userReg);

        const { user, token } = await loginUser(email, password);

        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production', 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        console.log("Registered user:", user);
        console.log("Token:", token);
        res.status(201).json({ message: 'User registered successfully', user, token });

    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    console.log("Login request received");
    console.log(req.body);
    try{
        const { email, password } = req.body;
        console.log(email, password);
        const { user, token } = await loginUser(email, password);

        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV === 'production', 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        
        res.status(200).json({ message: 'Login successful', user, token });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: 'Logout successful' });
};

const profile = (req, res) => {
    // req.user now contains the full decoded token with user info
    if (req.user) {
        // Return user object in the expected format
        const user = {
            _id: req.user.userId,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role
        };
        res.status(200).json({ user });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    register,
    login,
    logout,
    profile
};

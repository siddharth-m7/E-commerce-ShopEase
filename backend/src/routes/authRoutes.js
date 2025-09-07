const express = require('express');
const { register, login, logout, profile} = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile',authenticate, profile);

module.exports = router;
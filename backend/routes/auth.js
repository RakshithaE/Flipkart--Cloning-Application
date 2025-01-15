 // routes/auth.js

 const express = require('express');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const User = require('../models/User');
 const router = express.Router();
 
 // Register route
 router.post('/register', async (req, res) => {
     const { username, password } = req.body;
 
     // Check if user already exists
     const existingUser = await User.findOne({ username });
     if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
     }
 
     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Create a new user
     const user = new User({ username, password: hashedPassword });
     await user.save();
 
     res.status(201).json({ message: 'User registered successfully' });
 });
 
 // Login route
 router.post('/login', async (req, res) => {
     const { username, password } = req.body;
 
     // Find user by username
     const user = await User.findOne({ username });
     if (!user) {
         return res.status(400).json({ message: 'Invalid credentials' });
     }
 
     // Check password
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' });
     }
 
     // Generate JWT
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
     res.json({ token });
 });
 
 module.exports = router;
 
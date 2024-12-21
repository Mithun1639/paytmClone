const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const router = express.Router();
const Transaction = require('../model/Transaction');
const authMiddleware = require('../middleware/authMiddleware');

// User registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    console.log(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add money to wallet
router.post('/add', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    try {
      const user = await User.findById(req.user.id);
      user.walletBalance += amount;
      await user.save();
  
      await Transaction.create({
        userId: req.user.id,
        amount,
        type: 'CREDIT',
        description: 'Money added to wallet',
      });
  
      res.status(200).json({ balance: user.walletBalance });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Transfer money
  router.post('/transfer', authMiddleware, async (req, res) => {
    const { amount, recipientId } = req.body;
    try {
      const sender = await User.findById(req.user.id);
      const recipient = await User.findById(recipientId);
  
      if (sender.walletBalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      sender.walletBalance -= amount;
      recipient.walletBalance += amount;
  
      await sender.save();
      await recipient.save();
  
      await Transaction.create({
        userId: req.user.id,
        amount,
        type: 'DEBIT',
        description: `Transferred to user ${recipientId}`,
      });
  
      res.status(200).json({ balance: sender.walletBalance });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
const express = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { registerSchema } = require('../validations/auth');

router.post('/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
      expiresIn: process.env.JWT_EXPIRES_IN 
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({ token });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middlewares/auth');

router.get('/me', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ error: 'Данные пользователя не найдены' });
    }
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    });
  } catch (err) {
    console.error('Error in /me route:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;
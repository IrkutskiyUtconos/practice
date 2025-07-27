const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Требуется авторизация' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token payload:', decoded); // Логируем декодированные данные

    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.error(`User with id ${decoded.id} not found`);
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ error: 'Ошибка аутентификации' });
  }
};
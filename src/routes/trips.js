const express = require('express');
const auth = require('../middlewares/auth');
const { Trip } = require('../models');
const router = express.Router();
const { createTripSchema } = require('../validations/trip');
const { User } = require('../models');

// Создание похода
router.post('/', auth, async (req, res) => {
  const { error } = createTripSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const trip = await Trip.create({
      ...req.body,
      creatorId: req.user.id
    });
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Получение всех походов
// Получение походов с создателями
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [{
        model: User,
        attributes: ['id', 'username'] // Только нужные поля
      }]
    });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Присоединение к походу
router.post('/:id/join', auth, async (req, res) => {

  const { error } = createTripSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const trip = await Trip.findByPk(req.params.id);
  if (!trip) return res.status(404).json({ error: 'Поход не найден' });

  await trip.addUser(req.user.id, { through: { status: 'pending' } });
  res.json({ message: 'Запрос на участие отправлен' });
});

module.exports = router;
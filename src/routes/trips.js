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

// GET /api/trips/:id - Получить поход по ID
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    if (!trip) {
      return res.status(404).json({ 
        error: 'Поход не найден' 
      });
    }

    res.json(trip);
  } catch (err) {
    console.error('Ошибка при получении похода:', err);
    res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      details: err.message 
    });
  }
});

router.post('/:id/members', auth, async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Поход не найден' });

    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    // Используем метод create через модель TripParticipant
    await TripParticipant.create({
      tripId: trip.id,
      userId: user.id,
      role: 'participant',
      status: 'pending'
    });

    res.json({ message: 'Пользователь добавлен к походу' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновление похода
router.put('/:id', auth, async (req, res) => {
  const [updated] = await Trip.update(req.body, {
    where: { id: req.params.id, creatorId: req.user.id }
  });
  if (updated) {
    const trip = await Trip.findByPk(req.params.id);
    res.json(trip);
  } else {
    res.status(404).json({ error: 'Trip not found or no permission' });
  }
});

// Удаление похода (мягкое удаление)
router.delete('/:id', auth, async (req, res) => {
  const deleted = await Trip.destroy({
    where: { id: req.params.id, creatorId: req.user.id }
  });
  if (deleted) {
    res.json({ message: 'Trip deleted' });
  } else {
    res.status(404).json({ error: 'Trip not found or no permission' });
  }
});

module.exports = router;
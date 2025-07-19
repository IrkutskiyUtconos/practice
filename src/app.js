const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// рут auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// рут trips
app.use('/api/trips', require('./routes/trips'));

// гет тестовый
app.get('/', (req, res) => {
  res.json({ message: 'Hiking Planner API' });
});

// обработка ошибок 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
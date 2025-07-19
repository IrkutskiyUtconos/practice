const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

sequelize.query('CREATE DATABASE IF NOT EXISTS hiking_planner_dev;')
  .then(() => {
    console.log('Database created or already exists');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to create database:', err);
  });

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to database:', err);
  });
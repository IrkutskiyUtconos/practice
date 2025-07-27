const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const User = require('./user')(sequelize, Sequelize);
const Trip = require('./trip')(sequelize, Sequelize);

// Связи между моделями

User.hasMany(Trip, { foreignKey: 'creatorId' });
Trip.belongsTo(User, { foreignKey: 'creatorId' });

module.exports = {
  sequelize,
  User,
  Trip,
};
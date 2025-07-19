const { Sequelize, DataTypes } = require('sequelize');
const tripparticipant = require('./tripparticipant');
const config = require('../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const User = require('./user')(sequelize, Sequelize);
const Trip = require('./trip')(sequelize, Sequelize);

// Связи между моделями

User.hasMany(Trip, { foreignKey: 'creatorId' });
Trip.belongsTo(User, { foreignKey: 'creatorId' });
Trip.belongsToMany(User, { through: 'TripParticipant', foreignKey: 'tripId' });
User.belongsToMany(Trip, { through: 'TripParticipant', foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Trip,
  tripparticipant
};
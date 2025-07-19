const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    experienceLevel: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced', 'expert'),
      defaultValue: 'beginner'
    }
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Trip, {
      foreignKey: 'creatorId',
      as: 'createdTrips'
    });
    User.belongsToMany(models.Trip, {
      through: models.TripParticipant,
      foreignKey: 'userId',
      as: 'joinedTrips' // Уникальный алиас для походов участника
    });
  };

  User.prototype.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  return User;
};
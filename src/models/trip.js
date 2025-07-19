module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      defaultValue: 'medium'
    }
  }, {
    paranoid: false
  });

  Trip.associate = function(models) {
    Trip.belongsTo(models.User, {
      foreignKey: 'creatorId',
    });
    Trip.belongsToMany(models.User, {
      through: 'TripParticipant',
    });
  };

  return Trip;
};
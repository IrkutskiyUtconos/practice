module.exports = (sequelize, DataTypes) => {
  const TripParticipant = sequelize.define('TripParticipant', {
    role: {
      type: DataTypes.ENUM('organizer', 'participant'),
      defaultValue: 'participant'
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
      defaultValue: 'pending'
    }
  }, {
    timestamps: false
  });

  return TripParticipant;
};
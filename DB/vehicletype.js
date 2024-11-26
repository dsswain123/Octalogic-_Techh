module.exports = (sequelize, DataTypes) => {
    const VehicleType = sequelize.define('VehicleType', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    VehicleType.associate = (models) => {
      VehicleType.hasMany(models.Vehicle, { foreignKey: 'typeId' });
    };
    return VehicleType;
  };
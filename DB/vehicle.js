module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
      licensePlate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      typeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'VehicleTypes',
          key: 'id'
        }
      }
    });
    Vehicle.associate = (models) => {
      Vehicle.belongsTo(models.VehicleType, { foreignKey: 'typeId' });
    };
    return Vehicle;
  };
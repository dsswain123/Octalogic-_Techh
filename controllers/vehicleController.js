const { Vehicle, VehicleType } = require('../DB/vehicle');
const { Op } = require('sequelize');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { licensePlate, typeId } = req.body;
    const vehicle = await Vehicle.create({ licensePlate, typeId });
    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.bookVehicle = async (req, res) => {
  try {
    const { licensePlate } = req.body;

    const vehicle = await Vehicle.findOne({ where: { licensePlate } });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    return res.status(200).json({ message: 'Vehicle booked successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
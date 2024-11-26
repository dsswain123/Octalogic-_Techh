module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('VehicleTypes', [
        { name: 'Hatchback', createdAt: new Date(), updatedAt: new Date() },
        { name: 'SUV', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Sedan', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Cruiser', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Sports', createdAt: new Date(), updatedAt: new Date() }
      ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('VehicleTypes', null, {});
    }
  };
  
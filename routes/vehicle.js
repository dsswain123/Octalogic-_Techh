const express = require('express');
const router = express.Router();
const { createVehicle, bookVehicle } = require('../controllers/vehicleController');
const { validateVehicleBooking } = require('../middlewares/validation');
const passport = require('passport');


router.post('/create',
    passport.authenticate('jwt',
    { session: false }), createVehicle);


router.post('/book',
    passport.authenticate('jwt', { session: false }),
    validateVehicleBooking,
    bookVehicle);

module.exports = router;
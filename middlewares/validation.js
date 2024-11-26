const { z } = require('zod');

// Registration validation schema
const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});

// Login validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Vehicle booking validation schema
const vehicleBookingSchema = z.object({
  licensePlate: z.string().min(1, "License plate is required"),
});

// Middleware for validation
exports.validateRegister = (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors[0].message });
  }
};

exports.validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors[0].message });
  }
};

exports.validateVehicleBooking = (req, res, next) => {
  try {
    vehicleBookingSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors[0].message });
  }
};

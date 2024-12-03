const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vin: { type: String, required: true },
    model: { type: String, required: true },
    mileage: { type: Number, required: true },
    driver: { type: String, required: true },
    status: { type: String, default: 'Available' }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

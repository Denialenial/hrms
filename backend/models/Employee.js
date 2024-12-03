const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    staffNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    identityNumber: { type: String, required: true },
    qualifications: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    points: { type: Number, default: 0 }
});

module.exports = mongoose.model('Employee', EmployeeSchema);

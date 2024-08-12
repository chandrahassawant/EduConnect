// models/student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  className: {
    type: String,
    enum: ['V', 'VI', 'VII', 'VIII', 'IX', 'X'],
    default: 'V' // Default value if none provided
  },
  parentMobileNumber: String,
  parentOccupation: {
    type: String,
    enum: ['Engineer', 'Doctor', 'Teacher', 'Business', 'Farmer', 'Other'],
    default: 'Other' // Default value if none provided
  },
  address: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

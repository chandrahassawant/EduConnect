// models/teacher.js

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  schoolName: {
    type: String,
    enum: ['Z.P.kudal', 'Z.P.kankavli', 'Z.P.vengual', 'Z.P.avalegaon', 'Z.P.Digas', 'Other'],
    default: 'Other'
  },
  className: {
    type: String,
    enum: ['V', 'VI', 'VII', 'VIII', 'IX', 'X'],
    default: 'Class V'
  },
  address: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

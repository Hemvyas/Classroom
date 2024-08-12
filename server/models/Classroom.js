const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: [daySchema],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});



module.exports = mongoose.model("Classroom", classroomSchema);

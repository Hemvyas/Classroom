const User = require("../models/User");

exports.getStudentsInClassroom = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const teacher = await User.findOne({
      _id: teacherId,
      role: "Teacher",
    }).populate("classroom");

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (!teacher.classroom) {
      return res
        .status(400)
        .json({ message: "Teacher is not assigned to any classroom" });
    }

    const students = await User.find({
      classroom: teacher.classroom._id,
      role: "Student",
    })
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createTeacher,
  createStudent,
  createClassroom,
  assignTeacherToClassroom,
  assignStudentToClassroom,
  assignStudentToTeacher,
  getAllUsers,
  updateStudent,
  deleteStudent,
  updateTeacher,
  deleteTeacher,
  getStudents,
  getTeachers,
  getUser,
  updateClassroom,
  deleteClassroom,
  getClassroom,
} = require("../controllers/principalController");

// Defined routes with appropriate handlers
router.post("/teacher", auth(["Principal"]), createTeacher);
router.post("/student", auth(["Principal"]), createStudent);
router.post("/createClassroom", auth(["Principal"]), createClassroom);
router.put("/updateclassroom/:classroomId", auth(["Principal"]), updateClassroom);
router.delete("/delclassroom/:classroomId", auth(["Principal"]), deleteClassroom);
router.get("/getClassroom",auth(["Principal"]), getClassroom);
router.post("/assign-teacher", auth(["Principal"]), assignTeacherToClassroom);
router.post("/assign-students", auth(["Principal"]), assignStudentToClassroom);
router.post("/assign-student", auth(["Principal"]), assignStudentToTeacher);
router.get("/getTeachers", getTeachers);
router.get("/getStudents", getStudents);
router.get("/allUsers", getAllUsers);
router.get("/:id", getUser);
router.put("/updateStudent/:studentId", updateStudent);
router.delete("/delStudents/:studentId", deleteStudent);
router.put("/updateTeacher/:teacherId", updateTeacher);
router.delete("/delTeachers/:teacherId", deleteTeacher);

module.exports = router;

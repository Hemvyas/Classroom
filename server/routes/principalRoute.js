const express=require("express")
const router=express.Router();
const auth=require("../middleware/auth");
const { createTeacher, createStudent, createClassroom, assignTeacherToClassroom, assignStudentToClassroom, assignStudentToTeacher, getAllUsers, updateStudent, deleteStudent, updateTeacher, deleteTeacher } = require("../controllers/principalController");

router.post("/teacher",auth(["Principal"]), createTeacher);
router.post("/student", auth(["Principal"]), createStudent);
router.post("/classroom", auth(["Principal"]), createClassroom);
router.post("/assign-teacher", auth(["Principal"]), assignTeacherToClassroom);
router.post("/assign-students", auth(["Principal"]), assignStudentToClassroom);
router.post("/assign-student",auth(["Principal"]), assignStudentToTeacher);
router.get("/allUsers",auth(["Principal"]), getAllUsers);
router.put("/updateStudents/:studentId", updateStudent);
router.delete("/delStudents/:studentId", deleteStudent);
router.put("/updateTeachers/:teacherId", updateTeacher);
router.delete("/delteachers/:teacherId", deleteTeacher);
module.exports=router;
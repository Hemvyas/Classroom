const express=require("express");
const { getStudentsInClassroom } = require("../controllers/teacherController");
const router=express.Router();
router.get("/classroom/:teacherId", getStudentsInClassroom);
module.exports = router;

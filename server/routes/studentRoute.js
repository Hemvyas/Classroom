const express=require("express");
const { getStudents } = require("../controllers/studentController");
const router=express.Router();

router.get("/classmates/:studentId", getStudents);

module.exports = router;

const User=require("../models/User")

exports.getStudents=async(req,res)=>{
    try {
        const {studentId}=req.params;
        const student = await User.findById(studentId);
        
        if (!student || student.role !== "Student") {
           return res.status(404).json({ message: "Student not found" });
         }
         
         const classmates=await User.find({
            classroom:student.classroom._id,
            role:"Student",
            _id:{$ne:studentId}
         })
         res.status(200).json(classmates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

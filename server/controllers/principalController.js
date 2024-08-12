const User=require("../models/User")
const Classroom = require("../models/Classroom");

//creating teacher
exports.createTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = new User({ ...req.body, role: "Teacher" });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//creating classroom
exports.createClassroom = async (req, res) => {
  try {
    const { name, days, teachers, students } = req.body;

    // Basic validation
    if (!name || !days || days.length === 0) {
      return res
        .status(400)
        .json({ message: "Classroom name and days are required." });
    }

    const classroom = new Classroom(req.body);
    await classroom.save();
    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update Classroom
exports.updateClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const updateData = req.body;

    if (!classroomId) {
      return res.status(400).json({ message: "Classroom ID is required." });
    }

    const updatedClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedClassroom) {
      return res.status(404).json({ message: "Classroom not found." });
    }

    res
      .status(200)
      .json({ message: "Classroom updated successfully", updatedClassroom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete Classroom
exports.deleteClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;

    if (!classroomId) {
      return res.status(400).json({ message: "Classroom ID is required." });
    }

    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);

    if (!deletedClassroom) {
      return res.status(404).json({ message: "Classroom not found." });
    }

    res.status(200).json({ message: "Classroom successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//getClassroom
exports.getClassroom=async(req,res)=>{
  try {
    const classroom=await Classroom.find();
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


//creating Student
exports.createStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = new User({ ...req.body,role: "Student" });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//assignTeacherToClassroom
exports.assignTeacherToClassroom = async (req, res) => {
  try {
    const { teacherId, classroomId } = req.body;

    if (!teacherId || !classroomId) {
      return res
        .status(400)
        .json({ message: "Teacher ID and Classroom ID are required" });
    }

    const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });
    const classroom = await Classroom.findById(classroomId);

    if (!teacher || !classroom) {
      return res
        .status(404)
        .json({ message: "Teacher or Classroom not found" });
    }

    if (teacher.classroom) {
      return res
        .status(400)
        .json({ message: "Teacher is already assigned to a classroom" });
    }

    if (classroom.teachers.length > 0) {
      return res
        .status(400)
        .json({ message: "Classroom already has a teacher assigned" });
    }

    // Assign the teacher to the classroom
    classroom.teachers.addToSet(teacher._id);
    teacher.classroom = classroomId;

    // Save the changes
    await teacher.save();
    await classroom.save();

    res
      .status(200)
      .json({
        message: "Teacher successfully assigned to classroom",
        classroom,
        teacher,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//assignStudentToTeacher
exports.assignStudentToTeacher=async(req,res)=>{
   try {
     const { studentIds, teacherId } = req.body;

     if (!studentIds || !teacherId) {
       return res
         .status(400)
         .json({ message: "Student IDs and Teacher ID are required" });
     }

     const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });
    //  console.log("Teacher:", teacher);

     if (!teacher)
       return res.status(404).json({ message: "Teacher not found" });

     if (!teacher.classroom)
       return res
         .status(400)
         .json({ message: "Teacher does not have an assigned classroom" });

    const classroom = await Classroom.findById(teacher.classroom);
    if (!classroom)
      return res.status(404).json({ message: "Classroom not found" });
    
    // Fetch all students whose IDs are in the studentIds array and who have the role 'Student'
     const students = await User.find({
       _id: { $in: studentIds },
       role: "Student",
       classroom: { $exists: false },
     });

    //  console.log("Students:", students);

     if (students.length === 0) {
       return res
         .status(400)
         .json({
           message:
             "No unassigned students found or all students are already assigned to a classroom",
         });
     }


     // Assign the teacher's classroom to each student
     for (const student of students) {
       student.classroom = classroom._id;
       await student.save();
       classroom.students.addToSet(student._id);
     }

     await classroom.save();

     res
       .status(200)
       .json({
         message: "Students assigned to teacher successfully",
         students,
       });

   } catch (error) {
     res.status(500).json({ error: error.message });
   }
}

//assignStudentToClassroom
exports.assignStudentToClassroom=async(req,res)=>{
    try {
        const {classroomId,studentId}=req.body;
        const classroom=await Classroom.findById(classroomId);
        const student=await User.findById(studentId);

    if (!classroom || !student) {
      return res
        .status(404)
        .json({ message: "Classroom or Student not found" });
    }

    if(classroom.students){
        return res
          .status(400)
          .json({ message: "Student already exist in classroom" });
    }

    classroom.students.push(student._id);
    await classroom.save();
   
    res.status(200).json(classroom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Fetch all teachers (excluding Students and Principals)
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: { $nin: ["Student", "Principal"] } });
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Fetch all students (excluding Teachers and Principals)
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: { $nin: ["Teacher", "Principal"] } });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Fetch all users except Principals
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "Principal" } });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//fetch specific user
exports.getUser = async (req, res) => {
  try {
    const {id}=req.params;
    const users = await User.findById(id);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: error.message });
  }
};

//update student
exports.updateStudent=async(req,res)=>{
  try {
    const { studentId } = req.params;
    const updateData = req.body;

    if (!studentId || !updateData) {
      return res
        .status(400)
        .json({ message: "Student ID and update data are required" });
    }
        const student=await User.findByIdAndUpdate(studentId,updateData,{new:true})
         if (!student) {
           return res.status(404).json({ message: "Student not found." });
         }
     res.status(200).json({ message: "Student updated successfully", student });  } catch (error) {
     console.error("Error updating student:", error);
     res.status(500).json({ error: error.message });
  }
}

//delete student
exports.deleteStudent=async(req,res)=>{
  try {
    const {studentId}=req.params;
    const deleteStudent=await User.findByIdAndDelete(studentId);
      if (!deleteStudent) {
        return res.status(404).json({ message: "Student not found." });
      }
      await Classroom.updateMany({ students: studentId }, { $pull: { students: studentId } });
      res.status(200).json({ message: "Student successfully deleted." });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: error.message });
  }
}

//update Teacher
exports.updateTeacher=async(req,res)=>{
  try {
    const { teacherId } = req.params;
    const updateData = req.body;

    if (!teacherId || !updateData) {
      return res
        .status(400)
        .json({ message: "teacher ID and update data are required" });
    }
        const teacher = await User.findByIdAndUpdate(teacherId, updateData, {
          new: true,
        });
         if (!teacher) {
           return res.status(404).json({ message: "teacher not found." });
         }
     res.status(200).json({ message: "teacher updated successfully", teacher });  
    } 
    catch (error) {
     console.error("Error updating teacher:", error);
     res.status(500).json({ error: error.message });
  }
}

//delete teacher
exports.deleteTeacher=async(req,res)=>{
  try {
    const {teacherId}=req.params;
    const deleteteacher=await User.findByIdAndDelete(teacherId);
      if (!deleteteacher) {
        return res.status(404).json({ message: "teacher not found." });
      }
      await Classroom.updateMany(
        { teacher: teacherId },
        { $pull: { teachers: teacherId } }
      );
      res.status(200).json({ message: "teacher successfully deleted." });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ error: error.message });
  }
}
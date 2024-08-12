import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import TeacherInfo from "./PrincipalDashboard/Info/TeacherInfo";
import StudentInfo from "./PrincipalDashboard/Info/StudentInfo";
import UpdateForm from "./Form/updateForms";
import CreateClassroom from "./PrincipalDashboard/CreateClassroom";
import AssignTeacher from "./Form/AssignTeacher";
import ViewStudents from "./TeacherDashboard/Classroom";
import ViewClassmates from "./StudentDashboard/Classmate";
import PrincipalDashboard from "./PrincipalDashboard/PrincipalDashboard";

function App() {
    const userRole = localStorage.getItem("role");

    const getDashboardComponent = () => {
      switch (userRole) {
        case "Principal":
          return <PrincipalDashboard />;
        case "Teacher":
          return <ViewStudents />;
        case "Student":
          return <ViewClassmates />;
        default:
          return <Navigate to="/login" />;
      }
    };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={getDashboardComponent()} />
          <Route path="/login" element={<Login />} />

          {/* Principal Routes */}
          <Route path="/principal" element={<PrincipalDashboard />}>
            <Route path="teacher" element={<TeacherInfo />} />
            <Route path="student" element={<StudentInfo />} />
            <Route path="classroom" element={<CreateClassroom />} />
            <Route path="assign-teacher" element={<AssignTeacher />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacherClassroom" element={<ViewStudents />} />

          {/* Update Forms */}
          <Route
            path="/teacher/update/:id"
            element={<UpdateForm type="Teacher" />}
          />
          <Route
            path="/student/update/:id"
            element={<UpdateForm type="Student" />}
          />

          {/* Student & Teacher Specific */}
          <Route path="/classmates" element={<ViewClassmates />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

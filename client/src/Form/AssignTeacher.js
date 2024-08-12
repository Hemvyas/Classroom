import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AssignTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersResponse = await axios.get(
          "http://localhost:5000/api/principal/getTeachers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTeachers(teachersResponse.data);

        const classroomResponse = await axios.get(
          "https://classroom-eta.vercel.app/api/principal/getClassroom",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClassrooms(classroomResponse.data);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://classroom-eta.vercel.app/api/principal/assign-teacher",
        { teacherId: selectedTeacher, classroomId: selectedClassroom },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate("-1");
      }
    } catch (error) {
      setError("Failed to assign teacher. Please try again later.");
      console.error("Error assigning teacher:", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 2,
        maxWidth: "600px",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Assign Teacher to Classroom
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="teacher-select-label">Select Teacher</InputLabel>
          <Select
            labelId="teacher-select-label"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="classroom-select-label">Select Classroom</InputLabel>
          <Select
            labelId="classroom-select-label"
            value={selectedClassroom}
            onChange={(e) => setSelectedClassroom(e.target.value)}
          >
            {classrooms.map((classroom) => (
              <MenuItem key={classroom._id} value={classroom._id}>
                {classroom.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Assign Teacher
        </Button>
      </Box>
    </Container>
  );
};

export default AssignTeacher;

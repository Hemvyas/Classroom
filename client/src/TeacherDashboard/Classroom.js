import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const id=localStorage.getItem("userId")
  const navigate = useNavigate();


    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/teacher/classroom/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudents(response.data.students);
        console.log(response.data);
        
      } catch (error) {
        setError("Failed to fetch students. Please try again later.");
        console.error("Error fetching students:", error);
      }
    };
  useEffect(() => {
    fetchStudents();
  }, [id]);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/principal/delStudents/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // if (response.status === 200) {
      //   setStudents(students.filter((student) => student._id !== studentId));
      // }
      fetchStudents();
    } catch (error) {
      setError("Failed to delete student. Please try again later.");
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Students in Your Classroom</Typography>
      {error && <p>{error}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Classroom ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.classroom}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/student/update/${student._id}`)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(student._id)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewStudents;

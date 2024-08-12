import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentInfo = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/principal/getStudents",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching students data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/principal/delStudents/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      setError("Failed to delete student. Please try again later.");
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Students
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer
        component={Paper}
        sx={{ width: "100%", maxWidth: "800px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Link to={`/student/update/${student._id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentInfo;

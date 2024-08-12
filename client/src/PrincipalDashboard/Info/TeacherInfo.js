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

const TeacherInfo = () => {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/principal/getTeachers",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTeachers(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching teachers data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (teacherId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/principal/delTeachers/${teacherId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
    } catch (error) {
      setError("Failed to delete teacher. Please try again later.");
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 2,
      }}
    >
      {error && <p>{error}</p>}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Teachers
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: "80%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher._id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <Link to={`/teacher/update/${teacher._id}`}>
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
                    onClick={() => handleDelete(teacher._id)}
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

export default TeacherInfo;

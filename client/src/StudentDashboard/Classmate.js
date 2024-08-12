import React, { useEffect, useState } from "react";
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
} from "@mui/material";

const ViewClassmates = () => {
  const [classmates, setClassmates] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const id=localStorage.getItem("userId")
  
  useEffect(() => {
    const fetchClassmates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/student/classmates/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClassmates(response.data);
      } catch (error) {
        setError("Failed to fetch classmates. Please try again later.");
        console.error("Error fetching classmates:", error);
      }
    };

    fetchClassmates();
  }, [token]);

  return (
    <Container>
      <Typography variant="h4">Your Classmates</Typography>
      {error && <p>{error}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classmates.map((classmate) => (
              <TableRow key={classmate._id}>
                <TableCell>{classmate.name}</TableCell>
                <TableCell>{classmate.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewClassmates;

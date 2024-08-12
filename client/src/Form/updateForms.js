import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateForm = ({ type }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch the current data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/principal/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateResponse = await axios.put(
        `http://localhost:5000/api/principal/update${type}/${id}`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (updateResponse.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      setError("Failed to update. Please try again later.");
      console.error("Error updating data:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {`Update ${type}`}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://classroom-eta.vercel.app/api/auth/login",
        { email, password }
      );
      const { token, id, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("role",role);
       switch (role) {
         case "Principal":
           navigate("/principal");
           break;
         case "Teacher":
           navigate("/teacherClassroom");
           break;
         case "Student":
           navigate("/classmates");
           break;
         default:
           navigate("/login"); 
       }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Login;

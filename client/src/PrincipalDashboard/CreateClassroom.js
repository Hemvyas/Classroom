import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Box,
  FormGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateClassroom = () => {
  const [name, setName] = useState("");
  const [days, setDays] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setDays((prevDays) => {
      if (prevDays.find((d) => d.day === value)) {
        return prevDays.filter((d) => d.day !== value);
      } else {
        return [...prevDays, { day: value, startTime: "", endTime: "" }];
      }
    });
  };

  const handleTimeChange = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://classroom-eta.vercel.app/api/principal/createClassroom",
        { name, days },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        navigate("-1");
      }
    } catch (error) {
      setError("Failed to create classroom. Please try again later.");
      console.error("Error creating classroom:", error);
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Container maxWidth="sm" sx={{ paddingY: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Classroom
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
        <TextField
          label="Classroom Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Days
        </Typography>
        <FormGroup>
          {daysOfWeek.map((day) => (
            <Box key={day} sx={{ marginBottom: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={day}
                    checked={days.some((d) => d.day === day)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={day}
              />
              {days.some((d) => d.day === day) && (
                <Box sx={{ marginLeft: 2 }}>
                  <TextField
                    label="Start Time"
                    type="time"
                    value={days.find((d) => d.day === day)?.startTime || ""}
                    onChange={(e) =>
                      handleTimeChange(
                        days.findIndex((d) => d.day === day),
                        "startTime",
                        e.target.value
                      )
                    }
                    margin="normal"
                    required
                    sx={{ marginRight: 2 }}
                  />
                  <TextField
                    label="End Time"
                    type="time"
                    value={days.find((d) => d.day === day)?.endTime || ""}
                    onChange={(e) =>
                      handleTimeChange(
                        days.findIndex((d) => d.day === day),
                        "endTime",
                        e.target.value
                      )
                    }
                    margin="normal"
                    required
                  />
                </Box>
              )}
            </Box>
          ))}
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Create Classroom
        </Button>
      </Box>
    </Container>
  );
};

export default CreateClassroom;

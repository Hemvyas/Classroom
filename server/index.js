const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes=require("./routes/authRoute")
const principalRoute=require("./routes/principalRoute")
const studentRoute=require("./routes/studentRoute")
const teacherRoute=require("./routes/teacherRoute")
dotenv.config();
app.use(cors());
app.use(express.json());


//test route
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/auth",authRoutes);
app.use("/api/principal",principalRoute)
app.use("/api/student",studentRoute);
app.use("/api/teacher",teacherRoute);


const PORT=5000
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen(PORT || process.env.PORT, () => {
    console.log("Port Started at 5000");
  });
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
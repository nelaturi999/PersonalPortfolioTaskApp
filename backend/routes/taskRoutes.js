const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      completed: false,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to add task",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

module.exports = router;
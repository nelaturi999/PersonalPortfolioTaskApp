const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "Complete Assignment",
    status: "Pending"
  }
];

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// POST task
router.post("/", (req, res) => {

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: req.body.status
  };

  tasks.push(newTask);

  res.json({
    message: "Task Added Successfully",
    task: newTask
  });
});

// PUT task
router.put("/:id", (req, res) => {

  const taskId = parseInt(req.params.id);

  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.title = req.body.title;
    task.status = req.body.status;

    res.json({
      message: "Task Updated Successfully",
      task
    });
  } else {
    res.status(404).json({
      message: "Task Not Found"
    });
  }
});

// DELETE task
router.delete("/:id", (req, res) => {

  const taskId = parseInt(req.params.id);

  tasks = tasks.filter(t => t.id !== taskId);

  res.json({
    message: "Task Deleted Successfully"
  });
});

module.exports = router;
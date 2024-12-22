const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

const { authenticateToken } = require("../middleware/auth");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("event", "name")
      .populate("assignedTo", "name");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get tasks by event
router.get("/event/:eventId", async (req, res) => {
  try {
    const tasks = await Task.find({ event: req.params.eventId }).populate(
      "assignedTo",
      "name"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    // Emit WebSocket event for real-time updates
    // req.app.get("io").emit("taskCreated", task);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task status
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    // Emit WebSocket event for real-time updates
    // req.app.get("io").emit("taskUpdated", task);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    // Emit WebSocket event for real-time updates
    // req.app.get("io").emit("taskDeleted", req.params.id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

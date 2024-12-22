const express = require("express");
const Event = require("../models/Event.js");
const { authenticateToken } = require("../middleware/auth.js");

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const { start, end } = req.query;
    let query = {};

    if (start && end) {
      query.date = { $gte: new Date(start), $lte: new Date(end) };
    }

    const events = await Event.find(query).populate("attendees");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update event
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

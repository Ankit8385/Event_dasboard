const express = require("express");
const router = express.Router();
const Attendee = require("../models/Attendee");
const { authenticateToken } = require("../middleware/auth");

// router.get("/", async (req, res) => {
//   const attendees = await Attendee.find();
//   res.json(attendees);
// });

// router.post("/", async (req, res) => {
//   const attendee = new Attendee(req.body);
//   await attendee.save();
//   res.status(201).json(attendee);
// });

// router.delete("/:id", async (req, res) => {
//   await Attendee.findByIdAndDelete(req.params.id);
//   res.status(204).end();
// });

// Get all attendees
router.get("/", async (req, res) => {
  try {
    const attendees = await Attendee.find().populate("events");
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create attendee
router.post("/", async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    await attendee.save();
    res.status(201).json(attendee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete attendee
router.delete("/:id", async (req, res) => {
  try {
    await Attendee.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add attendee to event
router.post("/:id/events/:eventId", async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.id);
    attendee.events.push(req.params.eventId);
    await attendee.save();
    res.json(attendee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove attendee from event
router.delete("/:id/events/:eventId", async (req, res) => {
  try {
    const attendee = await Attendee.findById(req.params.id);
    attendee.events = attendee.events.filter(
      (event) => event.toString() !== req.params.eventId
    );
    await attendee.save();
    res.json(attendee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const eventService = require("../services/event.service");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const events = await eventService.getEvents();
  res.json(events);
});

router.post("/", auth, async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.json(event);
  } catch (error) {
    res.json({ error: true });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const eventId = req.params.id;
  const deletedEvent = await eventService.deleteEvent(eventId);
  res.json(deletedEvent);
});

module.exports = router;

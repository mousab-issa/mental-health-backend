const express = require("express");
const router = express.Router();
const eventService = require("../services/event.service");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const { page, limit } = req.query;
  const events = await eventService.getEvents(Number(page), Number(limit));
  res.json(events);
});

router.get("/:id", async (req, res) => {
  const eventId = req.params.id;
  const event = await eventService.getEvent(eventId);
  res.json(event);
});

router.post("/", auth, async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.json(event);
  } catch (error) {
    res.json({ error: true });
  }
});

router.put("/:id", auth, async (req, res) => {
  const eventId = req.params.id;
  const updatedEvent = await eventService.updateEvent(eventId, req.body);
  res.json(updatedEvent);
});

router.delete("/:id", auth, async (req, res) => {
  const eventId = req.params.id;
  const deletedEvent = await eventService.deleteEvent(eventId);
  res.json(deletedEvent);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const trackService = require("../services/track.service");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const tracks = await trackService.getTracks(Number(page), Number(limit));
  console.log(tracks);
  res.json(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await trackService.getTrack(req.params.id);
  res.json(track);
});

router.post("/", auth, async (req, res) => {
  try {
    const track = await trackService.createTrack(req.body);
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.delete("/:id", auth, async (req, res) => {
  const deletedTrack = await trackService.deleteTrack(req.params.id);
  res.json(deletedTrack);
});

router.put("/:id", auth, async (req, res) => {
  const updatedTrack = await trackService.updateTrack(req.params.id, req.body);
  res.json(updatedTrack);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const trackService = require("../services/track.service");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tracks = await trackService.getTracks(Number(page), Number(limit));

    res.status(200).json({ status: "success", data: tracks });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const track = await trackService.createTrack(req.body);
    res.status(201).json({ status: "success", data: track });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const track = await trackService.getTrack(req.params.id);
    if (!track) {
      return res
        .status(404)
        .json({ status: "error", message: "Track not found." });
    }
    res.status(200).json({ status: "success", data: track });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedTrack = await trackService.deleteTrack(req.params.id);
    if (!deletedTrack) {
      return res
        .status(404)
        .json({ status: "error", message: "Track not found." });
    }
    res.status(200).json({ status: "success", data: deletedTrack });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const updatedTrack = await trackService.updateTrack(
      req.params.id,
      req.body
    );
    if (!updatedTrack) {
      return res
        .status(404)
        .json({ status: "error", message: "Track not found." });
    }
    res.status(200).json({ status: "success", data: updatedTrack });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;

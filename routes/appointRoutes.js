const express = require("express");
const auth = require("../middleware/auth");
const appointmentController = require("../controllers/appointmentController");

const appointRouter = express.Router();

appointRouter.get(
  "/getallappointments",
  auth,
  appointmentController.getAllAppointments
);

appointRouter.post(
  "/bookappointment",
  auth,
  appointmentController.bookAppointment
);

appointRouter.put("/completed", auth, appointmentController.completed);

appointRouter.put("/accept", auth, appointmentController.accept);

module.exports = appointRouter;

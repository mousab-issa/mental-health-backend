const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const Chat = require("../models/chat.schema");

const getAllAppointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");

    return res.send(appointments);
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment({
      date: req.body.date,
      time: req.body.time,
      doctorId: req.body.doctorId,
      userId: req.locals,
    });

    const userNotifications = Notification({
      userId: req.locals,
      content: `You booked an appointment with Dr. ${req.body.doctorname} for ${req.body.date} ${req.body.time}`,
    });

    await userNotifications.save();

    const user = await User.findById(req.locals);

    const doctorNotification = Notification({
      userId: req.body.doctorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await doctorNotification.save();

    const result = await appointment.save();

    // Create the chat for the appointment
    const chat = new Chat({ appointmentId: result._id });
    await chat.save();

    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const completed = async (req, res) => {
  try {
    await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    const userNotification = Notification({
      userId: req.locals,
      content: `Your appointment with ${req.body.doctorname} has been completed`,
    });

    await userNotification.save();

    const user = await User.findById(req.locals);

    const doctorNotification = Notification({
      userId: req.body.doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    await doctorNotification.save();

    return res.status(201).send("Appointment completed");
  } catch (error) {
    res.status(500).send("Unable to complete appointment");
  }
};

const accept = async (req, res) => {
  try {
    await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Accepted" }
    );

    const userNotification = Notification({
      userId: req.locals,
      content: `Your appointment with ${req.body.doctorname} has been completed`,
    });

    await userNotification.save();

    const user = await User.findById(req.locals);

    const doctorNotification = Notification({
      userId: req.body.doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    await doctorNotification.save();

    return res.status(201).send("Appointment completed");
  } catch (error) {
    res.status(500).send("Unable to complete appointment");
  }
};

module.exports = {
  getAllAppointments,
  bookAppointment,
  completed,
  accept,
};

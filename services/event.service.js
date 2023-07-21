const Event = require("../models/event.scehma");

exports.getEvents = async () => {
  return await Event.find();
};

exports.createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

exports.deleteEvent = async (eventData) => {
  const event = Event.findOneAndDelete({ _id: eventData._id });
  return await event.save();
};

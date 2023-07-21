const cloudinary = require("cloudinary").v2;
const Event = require("../models/event.scehma");

cloudinary.config({
  cloud_name: "drdbf4spk",
  api_key: "271324754151776",
  api_secret: "eju_Yy_3-YhaFZEO5dCQoEDQCPU",
});

exports.getEvents = async (page, limit) => {
  if (page && limit) {
    return await Event.find()
      .skip((page - 1) * limit)
      .limit(limit);
  }
  return await Event.find();
};

exports.getEvent = async (id) => {
  return await Event.findById(id);
};

exports.createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

exports.updateEvent = async (eventId, updateData) => {
  return await Event.findByIdAndUpdate(eventId, updateData, { new: true });
};

exports.deleteEvent = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    return;
  }

  const imagePublicId = event.image.split("/").pop().split(".")[0];

  try {
    await cloudinary.uploader.destroy(imagePublicId);

    return await Event.findOneAndDelete({ _id: eventId });
  } catch (error) {}
};

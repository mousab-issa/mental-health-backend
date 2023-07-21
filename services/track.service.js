const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drdbf4spk",
  api_key: "271324754151776",
  api_secret: "eju_Yy_3-YhaFZEO5dCQoEDQCPU",
});

const Track = require("../models/track.schema");

exports.getTracks = async (page, limit) => {
  return await Track.find()
    .skip((page - 1) * limit)
    .limit(limit);
};

exports.getTrack = async (id) => {
  return await Track.findById(id);
};

exports.createTrack = async (trackData) => {
  const track = new Track(trackData);
  return await track.save();
};

exports.deleteTrack = async (trackId) => {
  const track = await Track.findById(trackId);
  if (!track) {
    return;
  }

  const imagePublicId = track.image.split("/").pop().split(".")[0];
  const linkPublicId = track.link.split("/").pop().split(".")[0];

  try {
    // Deleting image and link from Cloudinary
    await Promise.all([
      cloudinary.uploader.destroy(imagePublicId),
      cloudinary.uploader.destroy(linkPublicId),
    ]);

    // Deleting track from the database
    return await Track.findOneAndDelete({ _id: trackId });
  } catch (error) {
    return error;
  }
};

exports.updateTrack = async (trackId, updateData) => {
  return await Track.findByIdAndUpdate(trackId, updateData, { new: true });
};

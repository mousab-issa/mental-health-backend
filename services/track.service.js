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
  return await Track.findOneAndDelete({ _id: trackId });
};

exports.updateTrack = async (trackId, updateData) => {
  return await Track.findByIdAndUpdate(trackId, updateData, { new: true });
};

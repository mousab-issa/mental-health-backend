const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema(
  {
    message: {
      type: Object,
    },
    sender_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    chat_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    file_upload: {
      type: Object,
    },
    unread: {
      type: Object,
      default: "0",
    },
    flag: {
      type: Object,
      default: "0",
    },
  },
  {
    timestamps: {},
  }
);

const Message = mongoose.model("message", msgSchema);

module.exports = Message;

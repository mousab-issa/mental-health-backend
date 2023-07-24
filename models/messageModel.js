const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    link: {
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

msgSchema.plugin(mongoosePaginate);
const Message = mongoose.model("message", msgSchema);

module.exports = Message;

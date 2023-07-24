const Chat = require("../models/chat.schema");
const Message = require("../models/messageModel");

exports.getAllMessages = async (req, res) => {
  const { chat_id } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || 200;

  try {
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const messages = await Message.paginate({ chat_id }, options);

    const chat = await Chat.findOne({ appointmentId: chat_id });

    res.status(200).json({ chat, messages });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { message, sender_id, chat_id } = req.body;

  try {
    const newMessage = new Message({
      message,
      sender_id,
      chat_id,
    });

    await newMessage.save();

    res
      .status(201)
      .json({ message: "Message sent successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const newMessage = new Message({
      message: req.body.message,
      sender_id: req.body.sender_id,
      chat_id: req.body.chat_id,
      link: req.body.link,
    });

    await newMessage.save();
    res
      .status(201)
      .json({ message: "File uploaded successfully", data: newMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

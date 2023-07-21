const Message = require("../models/messageModel");

exports.getAllMessages = async (req, res) => {
  const { chat_id } = req.params;

  try {
    const messages = await Message.find({ chat_id });
    res.json({ messages: messages.length ? messages : [] });
  } catch (error) {
    res.json({ error: true });
  }
};

exports.sendMessage = async (req, res) => {
  const { message, sender_id, chat_id } = req.body;

  try {
    const newMessage = Message({
      message,
      sender_id,
      chat_id,
    });

    await newMessage.save();

    res.json({ message });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.deleteMessage = (req, res) => {
  Message.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: "Message deleted successfully" }))
    .catch((err) => res.status(500).json(err));
};

exports.uploadFile = (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
    sender_id: req.body.sender_id,
    chat_id: req.body.chat_id,
    link: req.body.link,
  });
  newMessage
    .save()
    .then((message) => res.json(message))
    .catch((err) => res.status(500).json(err));
};

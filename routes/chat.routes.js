const express = require("express");
const parser = require("../middleware/fileParser");
const chatService = require("../services/chat.service");

const chatRouter = express.Router();

chatRouter.post("/", chatService.sendMessage);

chatRouter.get("/:chat_id", chatService.getAllMessages);

chatRouter.delete("/message/:id", chatService.deleteMessage);

chatRouter.post("/upload", parser.single("file"), chatService.uploadFile);

module.exports = chatRouter;

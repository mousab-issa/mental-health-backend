const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();
require("./db/conn");

const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const eventRouter = require("./routes/events.routes");
const notificationRouter = require("./routes/notificationRouter");
const chatRouter = require("./routes/chat.routes");
const tracksRouter = require("./routes/track.routes");
const blogRouter = require("./routes/blog.routes");

const Message = require("./models/messageModel");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/chat", chatRouter);
app.use("/api/events", eventRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/blogs", blogRouter);

app.get("*", (req, res) => {
  res.json({ status: "connected" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  try {
    socket.on("sendMessage", (data) => {
      console.log(data);
      const newMessage = new Message(data);
      newMessage.save().then((message) => {
        io.to(data.chat_id).emit("message", message);
      });
    });

    socket.on("joinChat", (chat_id) => {
      socket.join(chat_id);
    });
  } catch (error) {
    console.log(error);
  }
});

server.listen(port, () => {});

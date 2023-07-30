const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: "Unable to get user" });
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.locals } }).select(
      "-password"
    );
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({ error: "Unable to get all users" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: { $regex: new RegExp("^" + req.body.email.toLowerCase(), "i") },
    });
    if (!user) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    const verifyPass = await bcrypt.compare(req.body.password, user.password);
    if (!verifyPass) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        isDoctor: user.isDoctor,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );

    return res.status(200).json({ data: { token, user } });
  } catch (error) {
    return res.status(500).json({ error: "Unable to login user" });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
        isDoctor: user.isDoctor,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );

    return res.json({ data: { accessToken } });
  });
};

const register = async (req, res) => {
  try {
    const emailPresent = await User.findOne({
      email: { $regex: new RegExp("^" + req.body.email.toLowerCase(), "i") },
    });
    if (emailPresent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPass });
    const newUser = await user.save();

    return res.status(201).json({ data: { user: newUser } });
  } catch (error) {
    return res.status(500).json({ error: "Unable to register user" });
  }
};

const updateprofile = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.locals,
      { ...req.body, password: hashedPass },
      { new: true }
    );

    return res.status(200).json({ data: { user: updatedUser } });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update user" });
  }
};

const deleteuser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    await Doctor.findOneAndDelete({ userId: req.body.userId });
    await Appointment.findOneAndDelete({ userId: req.body.userId });

    return res.status(200).json({ data: { status: "success" } });
  } catch (error) {
    return res.status(500).json({ error: "Unable to delete user" });
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  refreshToken,
  updateprofile,
  deleteuser,
};

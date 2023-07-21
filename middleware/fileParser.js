const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// setup cloudinary
cloudinary.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-api-secret",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat",
    format: async (req, file) => "png",
    public_id: (req, file) => file.originalname,
  },
});

const parser = multer({ storage: storage });

module.exports = parser;

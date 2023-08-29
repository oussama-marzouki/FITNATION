const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_KEY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "fitnation",
    allowed_formats: ["pdf", "png", "jpg" , "gif",'MP4', 'MOV', 'AVI'],
  },
});

const parser = multer({ storage: storage });

module.exports = { cloudinary, parser };
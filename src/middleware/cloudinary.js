const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_URL_API_KEY,
  api_secret: process.env.CLOUDINARY_URL_API_SECRET,
});

module.exports = cloudinary;

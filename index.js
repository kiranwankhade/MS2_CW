const express = require("express");

const { fileRouter } = require("./src/router/fileRouter");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const generateSignature = (paramsToSign) => {
  const { api_secret } = cloudinary.config();
  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");
  const signature = crypto
    .createHash("sha1")
    .update(sortedParams + api_secret)
    .digest("hex");
  return signature;
};

const uploadToCloudinary = async (filePath) => {
  try {
    cloudinaryConfig();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = { timestamp };
    const signature = generateSignature(paramsToSign);
    const result = await cloudinary.uploader.upload(filePath, {
      ...paramsToSign,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  cloudinaryConfig,
  generateSignature,
  uploadToCloudinary,
};
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4040;

const uploadDir = path.join(__dirname, "uploads");

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

app.use('/src/uploads', express.static("src/uploads"))

app.use('/files', fileRouter);

app.get('/', (req,res) => {
    res.send("Welcome to File/image upload")
});

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
});
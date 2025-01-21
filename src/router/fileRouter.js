const multer =  require("multer");
const express = require("express")

const upload = require("../middleware/fileUpload");
const { UNEXPECTED_FILE_TYPE } = require("../constants/file");
const { fileController } = require("../controllers/fileController");

const { imageResize } = require("../middleware/imageResize");

const { isFilePresent } = require("../middleware/validators/isFilePresent");
const authenticateJWT = require("../middleware/authentication");

const fileRouter = express.Router();

fileRouter.post(
  "/upload",
  authenticateJWT,
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code == UNEXPECTED_FILE_TYPE.code) {
          return res.status(400).json({ error: { description: err.field } });
        }
      } else {
        return res.status(500).json({ error: { description: err.message } });
      }
    });

    next();
  },
  fileController,
  imageResize,
  isFilePresent
);

module.exports = {fileRouter}
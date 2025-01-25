const { cloudinaryUpload } =  require("../service/fileService.js");

const fileController = async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ error: { description: "No file uploaded." } });
      }
  
      const file = req.files[0];
  
      const response = await cloudinaryUpload(file);
      console.log('response-file controller:', response)
  
      return res.status(200).json({ message: "File uploaded successfully", uploadResult: response });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {fileController}
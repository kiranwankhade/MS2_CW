const path = require("path")

const filterTypeValidator = (file) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimeType); // 'image/png'

    return extname && mimeType;
}

module.exports = filterTypeValidator;
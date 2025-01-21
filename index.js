const express = require("express");

const { fileRouter } = require("./src/router/fileRouter");
const {fileURLToPath} = require("url");
const path = require("path");
const fs = require("fs");

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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
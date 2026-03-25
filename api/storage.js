// api/storage.js

const multer = require("multer");

const storage = multer.diskStorage({
    // Set the destination for uploaded files
    destination: (req, file, cb) => {
        cb(null, "images/");
    },
    // Use a timestamp + original filename to create a unique filename
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
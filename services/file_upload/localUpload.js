const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const { info, success, error } = require("consola");

// creates multer uploads/temp folder if not created
fs.readdir("uploads", (err, files) => {
    if (files === undefined) {
        fs.mkdir("uploads", _ => {
            success("uploads folder created");

            fs.mkdir("uploads/temp", _ => {
                success("temp folder created");
                info("Multer ready for files upload ✨");
            });
        });
    }
});

// setup storage
const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, 'uploads/temp');
    },
    filename: function(req, file, cb) {
        // Set the name of the file in the upload folder
        const filename = `${uuid.v4()}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
    fileFilter: function(req, file, cb) {},
});

exports.upload = multer({ storage: storage }).any();
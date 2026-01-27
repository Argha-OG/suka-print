const path = require('path');
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const router = express.Router();

// Use memory storage to process image before saving
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});



module.exports = router;

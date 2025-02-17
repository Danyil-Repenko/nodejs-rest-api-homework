const path = require('path');
const multer = require('multer');
const uploadDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 10048576,
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload
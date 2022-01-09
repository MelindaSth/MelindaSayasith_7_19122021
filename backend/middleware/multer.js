const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname;
        callback(null, name);
    }
});

module.exports = multer({ storage }).single('file');
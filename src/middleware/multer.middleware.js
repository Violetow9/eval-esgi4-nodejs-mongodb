const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'picture')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname.split(' ').join('_') + Date.now() + "." + MIME_TYPES[file.mimetype]);
    }
});

module.exports = multer({storage: storage}).single('picture');
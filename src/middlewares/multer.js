const multer = require('multer');

// File Upload Folder
const DIR = './src/public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase()
        .split(' ').join('_');
        cb(null, fileName);
    }
});

module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'image/png' || file.mimetype== 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg formats are allowed !!!'));
        }
    }
})
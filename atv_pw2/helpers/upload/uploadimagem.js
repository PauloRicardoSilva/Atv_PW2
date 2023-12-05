const multer = require("multer");

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(null, false)
    };
};

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: "10 * 1024 * 1024"
    },
    fileFilter: fileFilter
});

module.exports = upload;
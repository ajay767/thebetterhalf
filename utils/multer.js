const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const allowedExtension = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
    if (!allowedExtension.includes(extension)) {
      cb(new Error("File Format is Not Supported", false));
      return;
    }
    cb(null, true);
  },
});

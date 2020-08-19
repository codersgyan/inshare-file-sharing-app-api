const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage }).single("myfile");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    const file = new File({
      filename: req.file.filename,
      size: req.file.size,
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    // Everything went fine.
    res.json({ file: `${process.env.APP_BASE_URL}/files/${response._id}` });
  });
});

module.exports = router;

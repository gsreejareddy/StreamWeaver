const express = require("express");
const Busboy = require("busboy");

const router = express.Router();

router.post("/upload", (req, res) => {
  const busboy = Busboy({ headers: req.headers });

  let fileName = "";
  let fileSize = 0;

  busboy.on("file", (fieldname, file, info) => {
    fileName = info.filename;

    file.on("data", (chunk) => {
      fileSize += chunk.length;
    });

    file.on("end", () => {
      console.log(`Received file: ${fileName}`);
      console.log(`File size: ${fileSize} bytes`);
    });
  });

  busboy.on("finish", () => {
    res.json({
      message: "File uploaded successfully",
      fileName: fileName,
      fileSize: fileSize
    });
  });

  req.pipe(busboy);
});

module.exports = router;
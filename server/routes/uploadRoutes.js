const express = require("express");
const Busboy = require("busboy");
const csv = require("csv-parser");

const router = express.Router();

router.post("/upload", (req, res) => {
  const busboy = Busboy({ headers: req.headers });

  let fileName = "";
  let fileSize = 0;
  const previewRows = [];

  busboy.on("file", (fieldname, file, info) => {
    fileName = info.filename;

    file
      .pipe(csv())
      .on("data", (row) => {
        fileSize++;

        if (previewRows.length < 1000) {
          previewRows.push(row);
        }
      })
      .on("end", () => {
        console.log(`Received file: ${fileName}`);
        console.log(`Preview rows: ${previewRows.length}`);
      });
  });

  busboy.on("finish", () => {
    res.json({
      message: "CSV processed successfully",
      fileName: fileName,
      rowCount: previewRows.length,
      preview: previewRows
    });
  });

  busboy.on("error", (error) => {
    console.error(error);

    res.status(500).json({
      message: "CSV processing failed"
    });
  });

  req.pipe(busboy);
});

module.exports = router;
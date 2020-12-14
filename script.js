const File = require("./models/file");
const fs = require("fs");
// Get all records older than 24 hours

function deleteData() {
  async function fetchData() {
    const files = await File.find({
      createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    if (files.length) {
      for (const file of files) {
        try {
          fs.unlinkSync(file.path);
          await file.remove();
          console.log(`successfully deleted ${file.filename}`);
        } catch (err) {
          console.log(`error while deleting file ${err} `);
        }
      }
    }
    console.log("Job done!");
  }
  fetchData();
}

exports.deleteData = deleteData;

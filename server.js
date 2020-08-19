require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");

let cors = require("cors");
app.use(cors());
// Database connection
// const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5w0oz.mongodb.net/${process.env.DB_NAME}>?retryWrites=true&w=majority`;
// const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fb0ww.mongodb.net/${process.env.DB_NAME}>?retryWrites=true&w=majority`;
const url = "mongodb://127.0.0.1/mydb"

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/downloader"));

app.listen(PORT, console.log(`Listening on port ${PORT}.`));

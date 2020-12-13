require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");

// For Cron Job
const cron = require("node-cron");
const deleteData = require("./script");

// Cors
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
};

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors(corsOptions));
app.use(express.static("public"));

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

// Serve static assests in production
app.use("/", express.static("public/frontend"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "public", "frontend", "index.html"))
);

// Setting a cron job
// (* * * * * *) => (second (optional), minute, hour, day of month, month, day of week)
cron.schedule("0 0 */23 * * *", () => {
  console.log("running a scripts every 23 hour");
  deleteData.deleteData();
});

app.listen(PORT, console.log(`Listening on port ${PORT}.`));

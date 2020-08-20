require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
// Cors 
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(','),
  }
app.use(cors(corsOptions))
app.use(express.static('public'));

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Routes 
app.use('/api/files', require('./routes/files'))
app.use('/files', require('./routes/downloader'))

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
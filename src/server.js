'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const cors  = require('cors');
const socket = require('socket.io');
app.use(cors());
app.use(express.json());

const {db} = require('./models/index');

// Import and use the routes in the server
const authRouter = require('./routes/authRoutes');
const requestsRouter = require('./routes/requestsRoutes');
app.use(authRouter);
app.use(requestsRouter);


// Test route
app.get("/", (req, res) => {
    res.status(200).send("Hello 👋 🖥 server");
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  if (!port) { throw new Error('Missing Port') }
  else { console.log(`🌎  ==> API Server now listening on PORT ${port}!`) };
});


db.sync()
  .then(() => {
    console.log("DataBase Connected");
    console.log(new Date().toLocaleString());
  })
  .catch(console.error);



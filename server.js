const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', (process.env.PORT || 5000));
require('dotenv').config();
// const url = ""
const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose.connect(url)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

var api = require('./api.js');
api.setApp(app, mongoose);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('large-project/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'large-project', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

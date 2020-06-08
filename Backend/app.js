require('dotenv').config();
const express = require('express');
const compression = require('compression');
const db = require('./configs/database');
const passport = require('passport');
const app = express();
app.use(compression());

//Import Routers
const router = require('./routes');

//Connect to DB

//Routers Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./configs/passport')(passport);

app.use('/api', router);
app.get('/api', (req, res) => {
  res.send('Call /api for api call');
});

db.initDb((err, db) => {
  if (err) console.log('Connect to DB failed');
  else console.log('DB connected');
});
// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log('> Currently listen on port ', PORT);
});

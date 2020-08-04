require('dotenv').config();
const express = require('express');
const compression = require('compression');
const db = require('./models');

const passport = require('passport');
const cors = require('cors');
const app = express();
app.use(compression());
app.use(cors());
//Import Routers
const router = require('./routes');

//Routers Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./configs/passport')(passport);

app.get('/_ah/warmup', async (req, res) => {
  await db.initDb((err, db) => {
    if (err) console.log('Connect to DB failed');
    else console.log('DB connected');
  });
  return res.status(200).end();
});

app.use('/api', router);
app.get('/api', (req, res) => {
  res.send('BrosJudge Backend System');
});

// Start server
const PORT = process.env.PORT || 3003;
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log('> Currently listen on port ', PORT);
  });
});

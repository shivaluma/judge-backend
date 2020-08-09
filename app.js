const express = require('express');
const compression = require('compression');
const db = require('./models');
const { logger } = require('./configs/logger');
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

app.use('/api', router);
app.get('/api', (req, res) => {
  res.send('BrosJudge Backend System');
});

// Start server
const PORT = process.env.PORT || 3003;
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    logger.info('Server running on port %d', PORT);
  });
});

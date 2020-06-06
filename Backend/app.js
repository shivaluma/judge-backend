require('dotenv').config();
const express = require('express');
const compression = require('compression');
const app = express();
app.use(compression());

//Routers
const router = require('./routes');
app.use('/api', router);
app.get('/api', (req, res) => {
  res.send('Call /api for api call');
});
// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log('> Currently listen on port ', PORT);
});

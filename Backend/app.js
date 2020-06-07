const express = require('express');
const compression = require('compression');
const assert = require('assert');
const app = express();
app.use(compression());
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');


//Import Routers
const router = require('./routes');

require('dotenv').config();


//Connect to DB
const dbName = 'JudgeSystem';
const client = new MongoClient(process.env.DB,{ useUnifiedTopology: true })

client.connect((err, client)=>{
  assert.equal(null, err);
  console.log("Connected correctly to server");
})


//Routers Middlewares
app.use(express.json());
app.use(bodyParser());
app.use('/api', router);
app.get('/api', (req, res) => {
  res.send('Call /api for api call');
});


// Start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log('> Currently listen on port ', PORT);
});

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoDbUrl =
  'mongodb+srv://admin:admin@cluster0-ctxqq.mongodb.net/JudgeSystem?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true';
let _db;
const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialzed');
  }
  return _db;
};

const ObjectId = mongodb.ObjectId;

module.exports = {
  initDb,
  getDb,
  ObjectId,
};

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const client = new MongoClient(process.env.DB,{ useUnifiedTopology: true });
console.log(process.env.DB);
const dbName = 'JudgeSystem';
const assert = require('assert');


client.connect((err, client)=>{
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    createCollection(db, ()=>{
        client.close();
    })
})

createCollection = (db, callback)=>{
    db.createCollection("Users",{
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        email:{
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        password:{
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        date:{
            type: Date,
            default: Date.now
        }
    },(err, results)=>{
        console.log("Collection created!")
        callback();
    });
};

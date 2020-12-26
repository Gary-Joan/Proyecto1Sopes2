const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient;
const redis = require('redis');
var redisClient = redis.createClient({ host: "", port: 6379, password: "", db: 0, decode_responses: true });

const uri = "";

var app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var database;
var collection;

app.listen(5000, () => {
    console.log("Server Running");
    MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db("mydb");
        collection = database.collection("casos");
        console.log("Mongo Success!");
    });
});

app.post("/insert", (req, res) => {

});
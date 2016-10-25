"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

const initialTweets = require("./tweets");
let tweets;

MongoClient.connect(MONGODB_URI, (err, db) => {
  tweets = db.collection('tweets');

  console.log("Connected to Database!");

});

const dbMethods = { 
  saveTweet: (data) => {
    tweets.insert(data);
    return true;
  },
  getTweets: (cb) => {
    tweets.find({}).toArray((err, results) => {
      if (err) { console.error("Error getting Tweets."); };
    
      cb(results);
    });
  }
}

module.exports = {

  connect: (onConnect) => {
    onConnect(dbMethods);
  }

}
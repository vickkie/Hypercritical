const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI; //MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB_NAME); // Your MongoDB database name
}

module.exports = connectDB;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Car-reverce:<db_password>@cluster0.xpotf.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

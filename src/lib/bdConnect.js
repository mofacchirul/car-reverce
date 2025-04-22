import { MongoClient, ServerApiVersion } from 'mongodb';
export const CollectionObjName = {
    servicecollections : "servicecollection",
      usecollection : "user_collection"
 } 

export default  function bdconnect(collectionname){

    const uri = process.env.MONGODB_URI ;// Replace with your MongoDB connection string
   
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    return client.db(process.env.DB_NAME).collection(collectionname);
}

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://root:<password>@cluster0.zon0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
const mongoose = require('mongoose');


  await mongoose.connect('mongodb://localhost/my_database');


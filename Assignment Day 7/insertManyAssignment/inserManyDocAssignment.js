const fs = require("fs");
const { readFile } = require("fs");// destructuring; var readFile=require("fs").readFile

const { MongoClient } = require("mongodb");// destructuring

const uri = "mongodb://127.0.0.1:27017/";// connection string

const mongoClient = new MongoClient(uri, { useUnifiedTopology: true });


async function run() {

    try {
        var client = await mongoClient.connect()

        // switch over to the db : dxcDb; if not present will create the db
        var dbName = client.db("dxcDb");
        // select the collection
        var collName = dbName.collection("emp");
        const insertDoc = [{ "empId": 203, "empName": "Mara" }, { "empId": 204, "empName": "kara" },
                           { "empId": 205, "empName": "dara" }, { "empId": 206, "empName": "jara" }, 
                           { "empId": 207, "empName": "vara" }];
        var res = await collName.insertMany(insertDoc);// promise is resolved then only res will be populated
        //console.log("Response of insertOne", res);
        console.log("Response of insertOne: Inserted Id:", res.insertedIds);
        console.log("Response of insertOne: Inserted Count:", res.insertedCount);
    }
    catch (err) {
        console.log("Error", err)
    }

}
run();

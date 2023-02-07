const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/";
const mongoClient = new MongoClient(uri, { useUnifiedTopology: true });
async function run() {

    try {
        var client = await mongoClient.connect()

        var dbName = client.db("dxcDb");
        var collName = dbName.collection("employees");
        // var filterObj={empId:201}
        // collName.deleteOne(filterObj)
        // .then((res)=>{
        //     if(res.matchedCount >0)
        //     {
        //         console.log("Number of docs matched " + res.matchedCount)
        //     }
        //     if(res.deletedCount >0)
        //     {
        //         console.log("Number of docs deleted " + res.deletedCount)
        //     }
        //     if(res.matchedCount == 0)
        //     {
        //         console.log("No docs matched the search criteria" )
        //     }
        //     if(res.deletedCount == 0)
        //     {
        //         console.log("No docs deleted")
        //     }
        // })
        // .catch((err)=>{
        //     console.log("Error during deletion ",err);
        //     mongoClient.close();
        // }); 

        var filterObj2={empId:{$gt:109}};
        collName.deleteMany(filterObj2)
        .then((res)=>{
            if(res.matchedCount >0)
            {
                console.log("Number of docs matched " + res.matchedCount)
            }
            if(res.deletedCount >0)
            {
                console.log("Number of docs deleted " + res.deletedCount)
            }
            if(res.matchedCount == 0)
            {
                console.log("No docs matched the search criteria" )
            }
            if(res.deletedCount == 0)
            {
                console.log("No docs deleted")
            }
        })
        .catch((err)=>{
            console.log("Error during deletion ",err);
            mongoClient.close();
        }); 
   }
    catch (err) {
        console.log("Error", err)
    }
}
run();
const fs = require("fs");
// Execute the inbuild core fs module.
// Name of the file & call back function as a parameter
var contentToWrite = "";
exports.readAndWriteFileAsynchronously = function() {
}
fs.readFile("file1.txt", function(err, data){
    console.log("File1 read operation completed");
    if (err){
        console.log("Error reading file1", err);
    } else {
        console.log("Successfully read the file1 with data");
        contentToWrite = contentToWrite + data.toString();
    }
});
fs.readFile("file2.txt", function(err, data){
    console.log("File2 read operation completed");
    if (err){
        console.log("Error reading file2", err);
    } else {
        console.log("Successfully read the file2 with data");
        contentToWrite = contentToWrite + data.toString();
    }
});
fs.readFile("file3.txt", function(err, data){
    console.log("File3 read operation completed");
    if (err){
        console.log("Error reading file3", err);
    } else {
        console.log("Successfully read the file3 with data");
        contentToWrite = contentToWrite + data.toString();
    }
});

setTimeout(()=>fs.writeFile("file5.txt", contentToWrite, function(err) {
    if (err){
        console.log("File write operation failed");
    } else {
        console.log("ASynchronous file read & write operation succesfully completed.");
    }
}), 10000);
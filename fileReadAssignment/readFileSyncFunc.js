const fs = require("fs");
// Execute the inbuild core fs module.
// Name of the file & call back function as a parameter
exports.readAndWriteFileSynchronously = function() {
    let data = "";
    fs.readFile("file1.txt", function(err1, data1){
        if (err1){
            console.log("Error reading file1", err1);
        } else {
            data = data + data1;
            console.log("File1 read operation completed");
            fs.readFile("file2.txt", function(err2, data2){
                if (err2){
                    console.log("Error reading file2", err2);
                } else {
                    data = data + data2;
                    console.log("File2 read operation completed");
                    fs.readFile("file3.txt", function(err3, data3){
                        if (err3){
                            console.log("Error reading file3", err3);
                        } else {
                            data = data + data3;
                            console.log("File3 read operation completed");
                            fs.writeFile("file4.txt", data, function(err) {
                                if (err) {
                                    console.log("file write operation failed");
                                } else {
                                    console.log("Synchronous file read & write operation succesfully completed.");
                                }
                            });
                        }
                    })
                }
            })
        }
    });
}
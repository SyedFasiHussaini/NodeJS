// Read 3 files and add all the contents of 3 files into file 4 using readFile & writeFile

const fs = require("fs");
var fileContent = "";
fs.readFile("file1.txt", function(err, file1Content) {
    if(err) {
        console.log("Error reading file 1", err);
        return;
    }
        fs.readFile("file2.txt", function(err, file2Content) {
            if(err) {
                console.log("Error reading file 1", err);
                return;
            }
            fs.readFile("file3.txt", function(err, file3Content) {
                    if(err) {
                        console.log("Error reading file 1", err);
                        return;
                    }
                    fileContent = file1Content + "\n" + file2Content + "\n" + file3Content;
                    fs.writeFile("file4.txt", fileContent, function(err) {
                            if(err) {
                                console.log("Error write file", err);
                            } else {
                                console.log("File written successfully");
                            }
                        })
                    })
                })
            })
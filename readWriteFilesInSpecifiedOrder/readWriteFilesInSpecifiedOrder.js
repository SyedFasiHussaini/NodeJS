// Read contents of all the 3 files and write it in an order (f1, f3, f2)

const fs = require("fs");
const filePaths = ["file1.txt", "file3.txt", "file2.txt"];
const combinedFiles = "file4.txt";
let fileContent = "";
let fileCounter = 0;

filePaths.forEach((filePath) => {
    fs.readFile(filePath, (err, data) => {
        console.log(`Executing File ${filePath} Write Operation`);
        if(err) throw err;
        // console.log(data);
        fileCounter++;
         fileContent += data;

        if (filePaths.length === fileCounter) {
            console.log("Writing in file 4");
            fs.writeFile(combinedFiles, fileContent, (err)=>{
                if(err) throw err;
                console.log("File Written Successfully....");
            })
        } 
    })
})
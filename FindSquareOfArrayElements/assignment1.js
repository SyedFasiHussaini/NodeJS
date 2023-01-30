console.log("Program to find square of elements of an Array")

var getSquareOfArrayElements = (arr) => {
    if (arr !== null) {
        var squareOfElements = [];
        for(let i=0; i<arr.length; i++) {
            squareOfElements[i] = arr[i]*arr[i];
        }
    } else {
        var squareOfElements = null
        console.log("Array is null" + squareOfElements);
        
    }
    return squareOfElements;
}
var myArray = null;
var result = getSquareOfArrayElements(myArray);
console.log(`The square of the given array [${myArray}] = [${result}].`);
console.log("Node JS assignment 2");

var getMaskedPhoneNumber = (phoneNumber) => {
    var phoneNumberStr = phoneNumber.toString();
    var firstThreeNums = phoneNumberStr.substring(0, 3);
    var lastThreeNums = phoneNumberStr.substring(phoneNumberStr.length - 3);
    var maskDigits = phoneNumberStr.substring(3, phoneNumberStr.length - 3).replace(/\d/g, "*");
    return firstThreeNums + maskDigits + lastThreeNums;

}

var phoneNumber = 123453456766789;
var result = getMaskedPhoneNumber(phoneNumber);
console.log(`Masked phone number of the given ${phoneNumber} is ${result}`);

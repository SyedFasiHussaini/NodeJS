// Create a function which takes in array of objects and returns the obj which has the highest salary 
//without using filter/find method
var empArr=[
    {empId:101,empName:"Asha",salary:1001,deptId:"D1"},
{empId:102,empName:"Gaurav",salary:12000,deptId:"D1"},
{empId:103,empName:"Karan",salary:2000,deptId:"D2"},
{empId:104,empName:"Kishan",salary:8000,deptId:"D1"},
{empId:105,empName:"Keshav",salary:3500,deptId:"D2"},
{empId:106,empName:"Pran",salary:4000,deptId:"D3"},
{empId:107,empName:"Saurav",salary:3800,deptId:"D3"}]

var getHighestSalaryEmp = (myArray) => {
    var highestEmpSalary = 0;

    for(let i = 0; i < myArray.length; i++) {
        var currentEmpSalary = myArray[i].salary;
        if (currentEmpSalary >= highestEmpSalary) {
            highestEmpSalary = currentEmpSalary;
        }
    }
    return highestEmpSalary;
}

var objWithHighestSalary = (empArray, empSalary) => {
    for(let i = 0; i<empArray.length; i++) {
        if (empArray[i].salary === empSalary) {
            return empArray[i];
        }
    }
}

var highestSalary=getHighestSalaryEmp(empArr); //{empId:106,empName:"Pran",salary:4000,deptId:"D3"}
console.log(`The highest salary is ${highestSalary}`);
var result = objWithHighestSalary(empArr,highestSalary);
console.log(`The Object with highest employee salary is`, result);
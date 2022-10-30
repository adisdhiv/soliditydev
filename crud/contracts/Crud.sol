// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crud {

struct Employee{
    string name;
    string email;
    uint256 age;
    address walletAddress;
}

Employee[] public employees;
uint256 public totalEmployees;

constructor(){
    totalEmployees = 0;
}

function compareStrings(string memory stringOne, string memory stringTwo) internal pure returns(bool){
    return keccak256(abi.encodePacked(stringOne)) == keccak256(abi.encodePacked(stringTwo));
}

function createEmployee(string memory name, string memory email, uint256 age, address walletAddress) public {
    Employee memory newEmployee = Employee(name, email, age, walletAddress);
    employees.push(newEmployee);
    totalEmployees++;
}

function getEmployee(string memory email) public view returns(string memory _name, uint _age, address _walletAddress){
    for(uint i = 0; i < totalEmployees ; i++){
        if(compareStrings(employees[i].email, email)){
            return (employees[i].name, employees[i].age, employees[i].walletAddress);
        }
    }
}

function updateEmployee(string memory name, string memory email) public returns(bool){
    for(uint i = 0; i < totalEmployees ; i++){
        if(compareStrings(employees[i].email, email)){
            employees[i].name = name;
            return (true);
        }
    }
    return false;
}

function deleteEmployee(string memory email) public returns(bool){
    require(totalEmployees > 0);
    for(uint i = 0; i < totalEmployees ; i++){
        if(compareStrings(employees[i].email, email)){
            employees[i] = employees[totalEmployees - 1];
            delete employees[totalEmployees - 1];
            totalEmployees--;
            return (true);
        }
    }
    return false;
}

}
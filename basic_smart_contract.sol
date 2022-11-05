// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    string name;
    uint age;
    constructor(string memory _name, uint _age){
        name = _name;
        age = _age;
    }
    function twiceAge() external view returns (uint){
        return age*2;
    }
    function returnName() public view returns (string memory) {
        return name;
    }
}

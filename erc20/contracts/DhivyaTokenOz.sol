// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DhivyaTokenOz is ERC20 {
    constructor(uint256 initialSupply) ERC20("DhivyaTokenOz", "DTO") {
        _mint(msg.sender, initialSupply);
    }
}
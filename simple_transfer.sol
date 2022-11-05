// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleTransfer {

    event Transfer(
        address indexed toWalletAddress,
        uint amount
    );

    function sendEther(address payable toWalletAddress, uint amount) external payable {
        require(address(this).balance >= amount, "Insufficient balance");
        toWalletAddress.transfer(amount);
        emit Transfer(toWalletAddress, amount);
    }

}

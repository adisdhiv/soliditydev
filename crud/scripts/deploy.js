// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

  const accounts = await hre.ethers.getSigners();
  console.log(accounts.map((item)=> item.address));

  const Crud = await hre.ethers.getContractFactory("Crud");
  const crud = await Crud.deploy();

  await crud.deployed();

  console.log(
    `Crud deployed to:`,crud.address
  );
  console.log("Total Employees before", await crud.totalEmployees());

  const response=await crud.createEmployee("A","a@gmail.com","24","0x589578A4CFA03434faC1D35dC6e9C772C3618388")
  const response1=await crud.createEmployee("B","b@gmail.com","28","0x589578A4CFA03434faC1D35dC6e9C772C3618388")
  console.log("Person A", response);
  console.log("Person B", response1);

  console.log("Total Employees after", await crud.totalEmployees());

  console.log("Employee by get", await crud.getEmployee("b@gmail.com"));

  await crud.updateEmployee("up","a@gmail.com")
  console.log("Employee after updation", await crud.employees(0));

  await crud.deleteEmployee("a@gmail.com")

  console.log("Employee after deletion", await crud.employees(0));

  console.log("Total Employees after deletion", await crud.totalEmployees());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

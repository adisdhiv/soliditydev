import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import { ABI, ESCROW_ADDRESS } from "./constant";

function App() {
  const buttonStyle = {
    padding: "8px 12px",
    background: "black",
    color: "white",
    border: "none",
    margin: "0px 4px",
  };
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    async function initiate() {
      const _provider = await detectEthereumProvider();
      const provider = new ethers.providers.Web3Provider(_provider);

      if (provider && contract) {
        setProvider(provider);
      } else {
        alert("Install Metamask");
      }
    }

    initiate();
  }, []);

  async function connect() {
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(ESCROW_ADDRESS, ABI, signer);
    const amount = await contract.amount();
    setAmount(amount.toNumber());
    setContract(contract);
  }

  async function deposit() {
    const transaction = await contract.deposit({
      value: amount,
    });

    console.log(transaction);

    await transaction.wait();
  }

  return (
    <div className="App">
      <h1>Escrow Contract App</h1>
      <div>
        <button style={buttonStyle} onClick={connect}>
          Connect
        </button>
        <span>Amount To Deposit : {amount}</span>
      </div>
      <span>Active Contract Address : {contract?.address}</span>
      <div
        style={{
          marginTop: "8px",
        }}
      >
        <button style={buttonStyle} onClick={deposit}>
          Deposit By Payer
        </button>
        <button style={buttonStyle}>Release By Lawer</button>
        <button style={buttonStyle}>Submit Work By Payee</button>
      </div>
    </div>
  );
}

export default App;
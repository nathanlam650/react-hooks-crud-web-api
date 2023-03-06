import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";
import axios from "axios"

require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

const pinFILEToIPFS = async(JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  return axios
      .post(url, JSONBody, {
        maxBodyLength: "Infinity",
          headers: {
              pinata_api_key: key,
              pinata_secret_api_key: secret,
          }
      })
      .then(function (response) {
         return {
             success: true,
             pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
         };
      })
      .catch(function (error) {
          console.log(error)
          return {
              success: false,
              message: error.message,
          }
      });
};



const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ipfsfileUrl, setipfsfileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  
  
  const changeHandler = (event) => {
  
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async() => {

    setipfsfileUrl("In progress...")
    const formData = new FormData();
    
    formData.append('file', selectedFile)

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    const IPFSfilerespond = pinFILEToIPFS(formData)
    if (IPFSfilerespond.success == true){
      setipfsfileUrl(IPFSfilerespond.pinataUrl)
    }
    else
    if (IPFSfilerespond.success == true){
      setipfsfileUrl("hard_code_one_later_for_error_in_demo")
    }

  };
  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(ipfsfileUrl, name, description);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setipfsfileUrl("");
    }
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        1.Simply upload a file, then press "upload. And wait a success sign and ipfs url. 
        2.After that, write name, and description, then press "Mint."
      </p>
      
      <div className="IPFSFileupolad">
        <label class="form-label">Choose File</label>
        <input type="file"  onChange={changeHandler}/>
        <button onClick={handleSubmission}>upload</button>
      </div>

      <form>
        {/*<h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />*/}
        <h2>🖼Url now:</h2>
        <p>
          {ipfsfileUrl}
        </p>
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>


    </div>
  );
};

export default Minter;

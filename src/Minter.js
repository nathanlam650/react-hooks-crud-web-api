import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";
import axios from "axios"
import DataService from "./services/MintedNFTService";

import Button from 'react-bootstrap/Button';

//import picture1 from "./picture1.png"

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
      .then(response=> {
        //console.log("t1",response)
        var temp_url = response.data.IpfsHash        
        //console.log("t2",temp_url)
         return {
             success: true,
             pinataUrl:  temp_url,
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
  const [theNFTurl, settheNFTurl] = useState("");
  const [toaddress, settoaddress] = useState("");
  const [owner, setowner] = useState("");
  const [organization, setorganization] = useState("");
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchEventname, setSearchEventname] = useState("");
  
  useEffect(() => {
    retrieveEvents();
  }, []);

  const retrieveEvents = () => {
    DataService.getAll()
      .then(response => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveEvents();
    setCurrentEvent(null);
    setCurrentIndex(-1);
  };

  const setActiveEvent = (event, index) => {
    setCurrentEvent(event);
    setCurrentIndex(index);
  };


  const saveEvent = (txHash) => {
    var data = {
      title: name,
      description: description,
      photourl: ipfsfileUrl,
      NFTurl: txHash,
      owner: owner,
      organization: organization,
    };

    DataService.create(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

 const handleowner = (event) => {
  setorganization("o")
  setowner(event.target.value)
  if (event.target.value == 'v1'){
    settoaddress("0x5c8e405B24D9ecd57Dc736726930e04f11C10Fb0")
  }
  if (event.target.value == 'v2'){
    settoaddress("0xe68D2b5f8D1efd4043EC9c1dE020fA48906dB6ed")
  }
  else{
    settoaddress("0x968E0325eD73671d78568B2ce64f6F3AF827386d")  
  }
}

  const changeHandler = (event) => {
  
    setSelectedFile(event.target.files[0]);
  };
  const handleipfsdefaultpicture = (event) => {
    //console.log(event.target.alt);
    setipfsfileUrl(event.target.alt);
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

    console.log((await IPFSfilerespond).success)
        
    if ((await IPFSfilerespond).success == true){
      setipfsfileUrl((await IPFSfilerespond).pinataUrl)
    }
    else
    if ((await IPFSfilerespond).success == false){
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
    const { success, status, txHash } = await mintNFT(ipfsfileUrl, name, description, toaddress);
    setStatus(status);
    if (success) {
      //setName(name);
      //setDescription(description);      
      //console.log(status)
      //console.log(txHash)
      settheNFTurl(txHash)
      
      saveEvent(txHash)
    }
  };


  return (
    <div className="Minter">
      <h4 className="row display-4 fw-normal" >NFT Minter</h4>
      <Button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </Button>

      <br></br>

      <Table striped bordered hover variant="primary">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Time</th>
            <th>Place</th>
            <th>Description</th>
            <th>event application link</th>
          </tr>
        </thead>
        <tbody>
        {events &&
              events.map((event, index) => (
                <tr
                  //className={
                  //  "list-group-item " + (index === currentIndex ? "active" : "")
                  //}
                  onClick={() => setActiveEvent(event, index)}
                  key={index}
                >
                <td>{event.title}</td>
                <td>{event.time}</td>
                <td>{event.place}</td>
                <td>{event.description}</td>
                <td>{event.applicationurl}</td>
                </tr>
              ))}
        </tbody>
      </Table>
      <br></br>

      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        1.Simply upload a file, then press "upload. And wait a success sign and ipfs url. 
        2.After that, write name, and description, then press "Mint."
      </p>
      
      <div className="IPFSFileupolad">
        <label className="form-label">Choose File</label>
        <input type="file"  onChange={changeHandler}/>
        
        

        <Button onClick={handleSubmission}>upload</Button>
      </div>

      <div>
        <img src={"https://gateway.pinata.cloud/ipfs/QmcGyxtWBA3JoE4AaiwavtZub1kzL3Xg5Q597HMQ5BTE1r"} 
          alt="QmcGyxtWBA3JoE4AaiwavtZub1kzL3Xg5Q597HMQ5BTE1r"
          onClick={handleipfsdefaultpicture}
          height={150}
          width={150}
          />
        <img src={"https://gateway.pinata.cloud/ipfs/QmNvrdRyNCzojBmwb2CDVMyzH5CxqhwH864ibVETyqDRSa"} 
        alt="QmNvrdRyNCzojBmwb2CDVMyzH5CxqhwH864ibVETyqDRSa"
        onClick={handleipfsdefaultpicture}
        height={150}
        width={150}
        />
      </div>      

      <form>
        <h2>🖼Url now:</h2>
        <p>
          {ipfsfileUrl}
        </p>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="e.g. My first NFT!"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Description</span>
          </div>
          <input
          type="text"
          placeholder={currentEvent.title ? currentEvent.title : "e.g. Even cooler than cryptokitties ;)"}
          onChange={(event) => setDescription(event.target.value)}
          />
        </div>


        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Owner Address or username</span>
          </div>
          <input
          type="text"
          placeholder={toaddress? toaddress: "0x..."}
          onChange={(event) => settoaddress(event.target.value)}
          />

          <input
          type="text"
          placeholder={currentEvent.title}
          onChange={handleowner}
          />
        </div>

        
      </form>

      <Button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </Button>

      <p id="status" style={{ color: "red" }}>
        {status}
      </p>


    </div>
  );
};

export default Minter;

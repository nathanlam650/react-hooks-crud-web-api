import React, { useState, useEffect } from "react";
import VolunteerDataService from "../services/VolunteerService";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../util/interact.js";
import "bootstrap/dist/css/bootstrap.min.css";



const Register = () => {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [response, setResponse] = useState("");

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    setAccount(walletResponse.address);
    setVolunteer({... volunteer, ["ETHaccountid"]: walletResponse.address});
        
  };

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

  useEffect(() => {
    window.ethereum.on("chainChanged", (chain) => {
      console.log(chain);
      setChain(chain);
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      console.log(accounts);
      setAccount(accounts?.[0]);
    });

  }, []);

  const initialUserState = {
    id: null,
    username: "",
    password: "",
    selfIntroduction:"",
    published: false,
    ETHaccountid: ""
  };
  const [volunteer, setVolunteer] = useState(initialUserState);
  
  //const [submitted, setSubmitted] = useState(false);

  const connect = () => {
    //ethereum.request(args: RequestArguments): Promise<unknown>;
    
    window.ethereum.request(
      {
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }],
      })

      .then((res) => {
        console.log("request accounts", res);
        
        setAccount(window.ethereum.selectedAddress);
        setVolunteer({... volunteer, ["ETHaccountid"]: res[0]});
        console.log("t1",volunteer, account,window.ethereum.selectedAddress, res[0])
      
      })
      .catch((e) => console.log("request accounts ERR", e));
      
      //setAccount(window.ethereum.selectedAddress);
      //setVolunteer({... volunteer, ["ETHaccountid"]: window.ethereum.selectedAddress});
      //console.log("t2",volunteer, account,window.ethereum.selectedAddress)
        
    };

  const showvolunteer = event => {
    console.log(volunteer)
  };
    
  const handleInputChange = event => {
    const { name, value } = event.target;
    setVolunteer({ ...volunteer, [name]: value });
    //console.log(value)
  };
    
  const saveVolunteer = () => { // i.e. sned to mongoDB server
        var data = {
        username: volunteer.username,
        password: volunteer.password,
        selfIntroduction: volunteer.selfIntroduction,
        ETHaccountid: volunteer.ETHaccountid
        };

        VolunteerDataService.createVolunteer(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        });

    };

  return (
    <div className="submit-form       has-bg-img    ">
      
      
      <button id="walletButton" onClick={connectWalletPressed} className="btn btn-success">
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>




        <div >

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={volunteer.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              required
              value={volunteer.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="selfIntroduction">self Introduction</label>
            <input
              type="text"
              className="form-control"
              id="selfIntroduction"
              required
              value={volunteer.selfIntroduction}
              onChange={handleInputChange}
              name="selfIntroduction"
            />
          </div>

        <header className="metamask-connection">


        {chain && `Connected chain: ${chain}`}
        <p></p>
        {account && `Connected account: ${account}`}
        <p></p>
        {response && `Last request response: ${response}`}
      </header>

          <button onClick={saveVolunteer} className="btn btn-success">
            Submit
          </button>

          <button onClick={showvolunteer} className="btn btn-success">
          showvolunteer
          </button>          
          
        </div>
      
    </div>
  );
};

export default Register;

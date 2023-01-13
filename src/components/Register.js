//import React, { useState } from "react";
import React, { useState, useEffect } from "react";
//import { useParams, useNavigate } from 'react-router-dom';
import VolunteerDataService from "../services/VolunteerService";
import MetaMaskSDK from "@metamask/sdk";

new MetaMaskSDK({
  useDeeplink: false,
  communicationLayerPreference: "socket",
});

const Register = () => {

  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [response, setResponse] = useState("");

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
        
      })
      .catch((e) => console.log("request accounts ERR", e));

      setVolunteer({...volunteer, ["ETHaccountid"]: account});

      console.log(volunteer, account)
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
    <div className="submit-form">
      

      <button style={{ padding: 10, margin: 10 } } 
          onClick={connect}  
          name="ETHaccountid"
          id="transfer id"
          value={account}
          >
          {account ? "Connected" : "Connect"}
      </button>

        <div>
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


        <button style={{ padding: 10, margin: 10 }} 
          onClick={handleInputChange}
          name="ETHaccountid"
          id="transfer id"
          value={account}
          >
          {"click after connected to metamask"}
        </button>

        {chain && `Connected chain: ${chain}`}
        <p></p>
        {account && `Connected account: ${account}`}
        <p></p>
        {response && `Last request response: ${response}`}
      </header>

          <button onClick={saveVolunteer} className="btn btn-success">
            Submit
          </button>
        </div>
      
    </div>
  );
};

export default Register;

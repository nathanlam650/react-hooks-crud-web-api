//import "./App.css";
import MetaMaskSDK from "@metamask/sdk";

import { useState, useEffect } from "react";

<script src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js" type="text/javascript">
</script>

new MetaMaskSDK({
  useDeeplink: false,
  communicationLayerPreference: "socket",
});

/*
ethereumButton.addEventListener('click', () => {
  ethereum.request({ method: 'eth_requestAccounts' });
});
*/

function MetamaskSDKApp() {
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState("");
  const [response, setResponse] = useState("");

  const connect = () => {
    //ethereum.request(args: RequestArguments): Promise<unknown>;
    
    window.ethereum.request(
      {
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }],
      })

      .then((res) => console.log("request accounts", res))
      .catch((e) => console.log("request accounts ERR", e));
  };

  const addEthereumChain = () => {
    window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: { symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
          },
        ],
      })
      .then((res) => console.log("add", res))
      .catch((e) => console.log("ADD ERR", e));
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", (chain) => {
      console.log(chain);
      setChain(chain);
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      console.log(accounts);
      setAccount(accounts?.[0]);
    });

    /*
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.addEventListener('click', () => {
      window.ethereum.request({ method: 'eth_requestAccounts' });
    });
    */
  }, []);

  const sendTransaction = async () => {
    const to = "0x0000000000000000000000000000000000000000";
    const transactionParameters = {
      to, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      value: "0x5AF3107A4000", // Only required to send ether to the recipient from the initiating external account.
    };

    try {
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };

  const sign = async () => {
    const msgParams = JSON.stringify({
      domain: {
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: parseInt(window.ethereum.chainId, 16),
        // Give a user friendly name to the specific contract you are signing for.
        name: "Ether Mail",
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: "1",
      },

      // Defining the message signing data content.
      message: {
        /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
        contents: "Hello, Bob!",
        attachedMoneyInEth: 4.2,
        from: {
          name: "Cow",
          wallets: [
            "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
          ],
        },
        to: [
          {
            name: "Bob",
            wallets: [
              "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
              "0xB0B0b0b0b0b0B000000000000000000000000000",
            ],
          },
        ],
      },
      // Refers to the keys of the *types* object below.
      primaryType: "Mail",
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        // Not an EIP712Domain definition
        Group: [
          { name: "name", type: "string" },
          { name: "members", type: "Person[]" },
        ],
        // Refer to PrimaryType
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person[]" },
          { name: "contents", type: "string" },
        ],
        // Not an EIP712Domain definition
        Person: [
          { name: "name", type: "string" },
          { name: "wallets", type: "address[]" },
        ],
      },
    });

    var from = window.ethereum.selectedAddress;

    var params = [from, msgParams];
    var method = "eth_signTypedData_v4";

    try {
      const resp = await window.ethereum.request({ method, params });
      setResponse(resp);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button style={{ padding: 10, margin: 10 } } onClick={connect} >
          {account ? "Connected" : "Connect"}
        </button>

        <button style={{ padding: 10, margin: 10 }} onClick={sign}>
          Sign
        </button>

        <button style={{ padding: 10, margin: 10 }} onClick={sendTransaction}>
          Send transaction
        </button>

        <button style={{ padding: 10, margin: 10 }} onClick={addEthereumChain}>
          Add ethereum chain
        </button>

        {chain && `Connected chain: ${chain}`}
        <p></p>
        {account && `Connected account: ${account}`}
        <p></p>
        {response && `Last request response: ${response}`}
      </header>
    </div>
  );
}

export default MetamaskSDKApp;


/**
 * [HMR] Waiting for update signal from WDS...
react_devtools_backend.js:4012 src/App.js
  Line 86:56:  Comments inside children section of tag should be placed inside braces  react/jsx-no-comment-textnodes
overrideMethod @ react_devtools_backend.js:4012
printWarnings @ webpackHotDevClient.js:138
handleWarnings @ webpackHotDevClient.js:143
push../node_modules/react-dev-utils/webpackHotDevClient.js.connection.onmessage @ webpackHotDevClient.js:210
2MetamaskSDKApp.js:18 request accounts ERR Error: Not connected
    at <anonymous>:1:4417
VM81:1 Uncaught (in promise) {message: 'Not connected', code: 4900}
(anonymous) @ VM81:1
postMessage (async)
(anonymous) @ inject.js:10
ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }],
      })
Promise {<pending>}[[Prototype]]: Promisecatch: ƒ catch()length: 1name: "catch"arguments: (...)caller: (...)[[Prototype]]: ƒ ()constructor: ƒ Promise()finally: ƒ finally()then: ƒ then()Symbol(Symbol.toStringTag): "Promise"[[Prototype]]: Object[[PromiseState]]: "pending"[[PromiseResult]]: undefined
VM81:1 Uncaught (in promise) Error: Not connected
    at <anonymous>:1:4417
(anonymous) @ VM81:1
setTimeout (async)
(anonymous) @ VM81:1
doSend @ VM81:1
doSend @ VM81:1
request @ VM81:1
(anonymous) @ VM135:1
VM81:1 Uncaught (in promise) {message: 'Not connected', code: 4900}
(anonymous) @ VM81:1
postMessage (async)
(anonymous) @ inject.js:10
 */
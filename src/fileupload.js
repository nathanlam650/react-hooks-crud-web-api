//all moved to minter, should be delete later

import { useState } from "react"
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


const FileUpload = () => {

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async() => {

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

    pinFILEToIPFS(formData)

  };

  return (
    <>
    <label class="form-label">Choose File</label>
    <input type="file"  onChange={changeHandler}/>
    <button onClick={handleSubmission}>Submit</button>
    </>
  )
}

export default FileUpload
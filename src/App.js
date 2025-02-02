import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import ViewActivities from "./components/ViewActivities";
import Register from "./components/Register";
import VolunteersList from "./components/VolunteersList";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventsList";
import OrganizationList from "./components/OrganizationList";
import AddOrganization from "./components/AddOrganization";
import Minter from "./Minter";
import ShowNFT from "./components/ShowNFT";
import love_1 from "./picture/love_1.png"

//import SignIn from "./components/SignIn";
//const MMSDK = new MetaMaskSDK(eth_requestAccounts);

//const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

//ethereum.request({ method: 'eth_requestAccounts', params: [] });

//<img class="bg-img" src="https://toruskit.com/assets/img/util/gray-w.svg"/>

/*
some code of this project is copy from:
https://github.com/bezkoder/react-hooks-crud-web-api
https://github.com/bezkoder/node-express-mongodb
https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft/
https://docs.pinata.cloud/pinata-api/ 
*/


function App() {
  const [usernameInroot, setusernameInroot] = useState("unlogin");
  const [inputusernameInroot, setinputusernameInroot] = useState("");
  const [inputpassword, setinputpassword] = useState("");
  

  const handlelogin = (event) => {
    console.log(event.target);
    setusernameInroot(inputusernameInroot);
  };

  if (usernameInroot==="admin"){
  return (
    <div style={{ 
      backgroundImage: `url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')`,
      height: `100vh`,
      backgroundRepeat: "repeat",
      overflow: "auto"
    }
    }>

      <nav className="navbar navbar-expand navbar-dark bg-secondary">
        <a href="/Register" className="navbar-brand h2">
        FIXPRE
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Register"} className="nav-link">
              NEW Volunteer
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/addorganization"} className="nav-link">
            NEW organization
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/addevent"} className="nav-link">
              New event
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/Eventslist"} className="nav-link">
            Eventslist
            </Link>
          </li>
                    
          <li className="nav-item">
            <Link to={"/Organizationlist"} className="nav-link">
            Organizationlist
            </Link>
          </li>


          <li className="nav-item">
            <Link to={"/Minter"} className="nav-link">
            Minter
            </Link>
          </li> 

          <li className="nav-item">
            <Link to={"/ShowNFT"} className="nav-link">
            Show your NFT
            </Link>
          </li> 
          
        </div>
      </nav>

      <div className="container mt-3 has-bg-img" style={{ 
        backgroundImage: `url("https://www.marshallsindia.com/ImageBuckets/ItemImages/ZA%201903.jpg?id=75")` 
        }}>

          <Routes>
            <Route path="/" element={<ShowNFT username={usernameInroot}/>} /> //*mean show all events*/
            <Route path="/Register" element={<Register/>} />
            <Route path="/Volunteerslist" element={<VolunteersList/>}/>
            <Route path="/addevent" element={<AddEvent/>}/>
            <Route path="/Eventslist" element={<EventList/>}/>
            <Route path="/Organizationlist" element={<OrganizationList/>}/>
            <Route path="/addorganization" element={<AddOrganization/>}/>
            <Route path="/Minter" element={<Minter/>}/>              
            <Route path="/ShowNFT" element={<ShowNFT username={usernameInroot}/>}/>
          </Routes>
          </div>

      </div>

  );
  }
  if(usernameInroot==="o"){
    return (
      <div style={{ 
        backgroundImage: `url('https://media.istockphoto.com/id/1212342896/vector/abstract-hexagon-wallpaper-white-background-3d-vector-illustration.jpg?s=170667a&w=0&k=20&c=kMIaYjtkjoLGAyq7BBLfz9SrJryy0uIGOrfmi6-ILEA=')`,
        height: `100vh`,
        backgroundRepeat: "repeat",
        overflow: "auto"
      }
      }>
  
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <a href="/Register" className="navbar-brand h2">
          FIXPRE
          </a>
  
          <div className="navbar-nav mr-auto">
  
            <li className="nav-item">
              <Link to={"/addevent"} className="nav-link">
                New event
              </Link>
            </li>
  
            <li className="nav-item">
              <Link to={"/Eventslist"} className="nav-link">
              Events List
              </Link>
            </li>
    
            <li className="nav-item">
              <Link to={"/Minter"} className="nav-link">
              Mint NFT
              </Link>
            </li> 

            <li className="nav-item">
              <Link to={"/ShowNFT"} className="nav-link">
              Show NFT that you minted
              </Link>
            </li> 
          </div>
        </nav>     
  
        <div className="container mt-3 has-bg-img" style={{ 
          backgroundImage: `url("https://www.marshallsindia.com/ImageBuckets/ItemImages/ZA%201903.jpg?id=75")` 
          }}>
        
  
            <Routes>
              <Route path="/" element={<ShowNFT username={usernameInroot}/>}/> //*mean show all events*/
              <Route path="/Register" element={<Register/>} />
              <Route path="/Volunteerslist" element={<VolunteersList/>}/>
              <Route path="/addevent" element={<AddEvent/>}/>
              <Route path="/Eventslist" element={<EventList/>}/>
              <Route path="/Organizationlist" element={<OrganizationList/>}/>
              <Route path="/addorganization" element={<AddOrganization/>}/>
              <Route path="/Minter" element={<Minter/>}/>
              <Route path="/ShowNFT" element={<ShowNFT username={usernameInroot}/>}/>
            </Routes>
            </div>

        </div>
            
    );    
  }
  if(usernameInroot==="Tom" || usernameInroot==="Roy" ){
    return (
      <div style={{ 
        backgroundImage: `url('https://media.istockphoto.com/id/1212342896/vector/abstract-hexagon-wallpaper-white-background-3d-vector-illustration.jpg?s=170667a&w=0&k=20&c=kMIaYjtkjoLGAyq7BBLfz9SrJryy0uIGOrfmi6-ILEA=')`,
        height: `100vh`,
        backgroundRepeat: "repeat",
        overflow: "auto"
      }
      }>
  
        <nav className="navbar navbar-expand navbar-dark bg-warning">
          <a href="/" className="navbar-brand">
            FIXPRE
          </a>
  
          <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/Eventslist"} className="nav-link">
              Events List
              </Link>
            </li>
                      
            <li className="nav-item">
              <Link to={"/Organizationlist"} className="nav-link">
              Organization List
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/ShowNFT"} className="nav-link">
              Show your own NFT
              </Link>
            </li> 
          </div>
        </nav>
  
        <div className="container mt-3 has-bg-img" style={{ 
          backgroundImage: `url("https://www.marshallsindia.com/ImageBuckets/ItemImages/ZA%201903.jpg?id=75")` 
          }}>

            <Routes>
              <Route path="/" element={<ShowNFT username={usernameInroot}/>} /> //*mean show all events*/
              <Route path="/Eventslist" element={<EventList/>}/>
              <Route path="/Organizationlist" element={<OrganizationList/>}/>
              <Route path="/ShowNFT" element={<ShowNFT username={usernameInroot}/>}/>
            </Routes>
            
       </div>
  </div>
    );    
  }
  else{
    return (<main class="form-signin w-100 m-auto">
      <div className="container mt-3 has-bg-img" style={{ 
        backgroundImage: `url("https://www.marshallsindia.com/ImageBuckets/ItemImages/ZA%201903.jpg?id=75")`
      }}>
    <form>
      <img class="mb-4" src={love_1} alt="" width="100" height="100"/>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  
      <div class="form-floating">
        <input type="string" class="form-control" id="floatingInput" placeholder="o,Tom,Roy,admin" onChange={(event) => setinputusernameInroot(event.target.value)}/>
        <label for="floatingInput">Username</label>
      </div>

      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="o,Tom,Roy" onChange={(event) => setinputpassword(event.target.value)}/>
        <label for="floatingPassword">Password</label>
      </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit"  onClick={handlelogin}>Sign in</button>
    </form>
    </div>
  </main>
    );  
  }
}

export default App;

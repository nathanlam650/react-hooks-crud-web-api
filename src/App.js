import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//import ViewActivities from "./components/ViewActivities";
import Register from "./components/Register";
import VolunteersList from "./components/VolunteersList";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventsList";
import OrganizationList from "./components/OrganizationList";
import AddOrganization from "./components/AddOrganization";
//import MetamaskSDKApp from "./components/MetamaskSDKApp";
import Addimagetest from "./components/Addimagetest";
import VolunteerUI from "./volunteerUI";
import OrganizationUI from "./OrganizationUI";
import WelcomePageOrganization from "./components/WelcomePageOrganization";
import WelcomePageVolunteer from "./components/WelcomePageVolunteer";
import Minter from "./Minter";
import ShowNFT from "./components/ShowNFT";
//import SignIn from "./components/SignIn";
//const MMSDK = new MetaMaskSDK(eth_requestAccounts);

//const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

//ethereum.request({ method: 'eth_requestAccounts', params: [] });

//<img class="bg-img" src="https://toruskit.com/assets/img/util/gray-w.svg"/>


function App() {
  const [usernameInroot, setusernameInroot] = useState("unlogin");
  const [inputusernameInroot, setinputusernameInroot] = useState("");
  const [inputpassword, setinputpassword] = useState("");
  

  const handlelogin = (event) => {
    console.log(event.target);
    setusernameInroot(inputusernameInroot);
  };

  if (usernameInroot=="admin"){
  return (
    <div style={{ 
      backgroundImage: `url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')`,
      height: `100vh`
    }
    }>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/Register" className="navbar-brand">
          VolunteerWeb3
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Register"} className="nav-link">
              New register
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
            <Link to={"/addorganization"} className="nav-link">
            addorganization
            </Link>
          </li>

           
          <li className="nav-item">
            <Link to={"/Addimagetest"} className="nav-link">
            Addimagetest
            </Link>
          </li>  

          <li className="nav-item">
            <Link to={"/Minter"} className="nav-link">
            /Minter
            </Link>
          </li> 
          <li className="nav-item">
            <Link to={"/ShowNFT"} className="nav-link">
            /ShowNFT
            </Link>
          </li> 
          
        </div>
      </nav>

      <div className="container mt-3 has-bg-img" style={{ 
        backgroundImage: `url("https://via.placeholder.com/500")` 
        }}>
      

          <Routes>
            <Route path="/" element={<Register/>} /> //*mean show all events*/
            <Route path="/Register" element={<Register/>} />
            <Route path="/Volunteerslist" element={<VolunteersList/>}/>
            <Route path="/addevent" element={<AddEvent/>}/>
            <Route path="/Eventslist" element={<EventList/>}/>
            <Route path="/Organizationlist" element={<OrganizationList/>}/>
            <Route path="/addorganization" element={<AddOrganization/>}/>
            <Route path="/Addimagetest" element={<Addimagetest/>}/>
            <Route path="/Minter" element={<Minter/>}/>              
            <Route path="/ShowNFT" element={<ShowNFT username={usernameInroot}/>}/>
            

            <Route path="/Vol/:id" element={<VolunteerUI />}>
              <Route path="" element={<WelcomePageVolunteer/>}/>
              <Route path="Eventslist" element={<EventList />}/>
              <Route path="Organizationlist" element={<OrganizationList/>}/>
            </Route>

            <Route path="Org/:id" element={<OrganizationUI/>}>
              <Route path="" element={<WelcomePageOrganization/>} /> 
              <Route path="Volunteerslist" element={<VolunteersList/>}/>
              <Route path="addevent" element={<AddEvent/>}/>
              <Route path="Eventslist" element={<EventList/>}/>
              <Route path="Organizationlist" element={<OrganizationList/>}/>
            </Route>
          </Routes>
          </div>

      </div>

  );
  }
  if(usernameInroot=="o"){
    return (
      <div style={{ 
        backgroundImage: `url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')`,
        height: `100vh`
      }
      }>
  
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/Register" className="navbar-brand">
            VolunteerWeb3
          </a>
  
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Register"} className="nav-link">
                New register
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
              <Link to={"/addorganization"} className="nav-link">
              addorganization
              </Link>
            </li>
  
             
            <li className="nav-item">
              <Link to={"/Addimagetest"} className="nav-link">
              Addimagetest
              </Link>
            </li>  
  
            <li className="nav-item">
              <Link to={"/Minter"} className="nav-link">
              /Minter
              </Link>
            </li> 
            <li className="nav-item">
              <Link to={"/ShowNFT"} className="nav-link">
              /ShowNFT
              </Link>
            </li> 
  
            
            
            
          </div>
        </nav>
  
        <div className="container mt-3 has-bg-img" style={{ 
          backgroundImage: `url("https://via.placeholder.com/500")` 
          }}>
        
  
            <Routes>
              <Route path="/" element={<Register/>} /> //*mean show all events*/
              <Route path="/Register" element={<Register/>} />
              <Route path="/Volunteerslist" element={<VolunteersList/>}/>
              <Route path="/addevent" element={<AddEvent/>}/>
              <Route path="/Eventslist" element={<EventList/>}/>
              <Route path="/Organizationlist" element={<OrganizationList/>}/>
              <Route path="/addorganization" element={<AddOrganization/>}/>
              <Route path="/Addimagetest" element={<Addimagetest/>}/>
              <Route path="/Minter" element={<Minter/>}/>
              <Route path="/ShowNFT" element={<ShowNFT username={usernameInroot}/>}/>
              
              
              
  
              <Route path="/Vol/:id" element={<VolunteerUI />}>
                <Route path="" element={<WelcomePageVolunteer/>}/>
                <Route path="Eventslist" element={<EventList />}/>
                <Route path="Organizationlist" element={<OrganizationList/>}/>
              </Route>
  
              <Route path="Org/:id" element={<OrganizationUI/>}>
                <Route path="" element={<WelcomePageOrganization/>} /> 
                <Route path="Volunteerslist" element={<VolunteersList/>}/>
                <Route path="addevent" element={<AddEvent/>}/>
                <Route path="Eventslist" element={<EventList/>}/>
                <Route path="Organizationlist" element={<OrganizationList/>}/>
              </Route>
            </Routes>
            </div>
  
        </div>
  
    );    
  }
  if(usernameInroot=="v"){
    return (
      <div style={{ 
        backgroundImage: `url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')`,
        height: `100vh`
      }
      }>
  
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/Register" className="navbar-brand">
            VolunteerWeb3
          </a>
  
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Register"} className="nav-link">
                New register
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
              <Link to={"/addorganization"} className="nav-link">
              addorganization
              </Link>
            </li>
  
             
            <li className="nav-item">
              <Link to={"/Addimagetest"} className="nav-link">
              Addimagetest
              </Link>
            </li>  
  
            <li className="nav-item">
              <Link to={"/Minter"} className="nav-link">
              /Minter
              </Link>
            </li> 
            <li className="nav-item">
              <Link to={"/ShowNFT"} className="nav-link">
              /ShowNFT
              </Link>
            </li> 
 
            
            
            
          </div>
        </nav>
  
        <div className="container mt-3 has-bg-img" style={{ 
          backgroundImage: `url("https://via.placeholder.com/500")` 
          }}>
        
  
            <Routes>
              <Route path="/" element={<Register/>} /> //*mean show all events*/
              <Route path="/Register" element={<Register/>} />
              <Route path="/Volunteerslist" element={<VolunteersList/>}/>
              <Route path="/addevent" element={<AddEvent/>}/>
              <Route path="/Eventslist" element={<EventList/>}/>
              <Route path="/Organizationlist" element={<OrganizationList/>}/>
              <Route path="/addorganization" element={<AddOrganization/>}/>
              <Route path="/Addimagetest" element={<Addimagetest/>}/>
              <Route path="/Minter" element={<Minter/>}/>
              <Route path="/ShowNFT" element={<ShowNFT username={usernameInroot}/>}/>

              
              
              
  
              <Route path="/Vol/:id" element={<VolunteerUI />}>
                <Route path="" element={<WelcomePageVolunteer/>}/>
                <Route path="Eventslist" element={<EventList />}/>
                <Route path="Organizationlist" element={<OrganizationList/>}/>
              </Route>
  
              <Route path="Org/:id" element={<OrganizationUI/>}>
                <Route path="" element={<WelcomePageOrganization/>} /> 
                <Route path="Volunteerslist" element={<VolunteersList/>}/>
                <Route path="addevent" element={<AddEvent/>}/>
                <Route path="Eventslist" element={<EventList/>}/>
                <Route path="Organizationlist" element={<OrganizationList/>}/>
              </Route>
            </Routes>
            </div>
  
        </div>
  
    );    
  }
  else{
    return (<main class="form-signin w-100 m-auto">
    <form>
      <img class="mb-4" src="/docs/{{< param docs_version >}}/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  
      <div class="form-floating">
        <input type="string" class="form-control" id="floatingInput" placeholder="o,v1,v2,admin" onChange={(event) => setinputusernameInroot(event.target.value)}/>
        <label for="floatingInput">Username</label>
      </div>

      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="o,v1,v2" onChange={(event) => setinputpassword(event.target.value)}/>
        <label for="floatingPassword">Password</label>
      </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit"  onClick={handlelogin}>Sign in</button>
    </form>
  </main>
    );  
  }
}
//<Route path="/ViewActivities" element={<ViewActivities/>} />
//todo

//<Route path="/Login" element={<Login/>}/>
//

export default App;

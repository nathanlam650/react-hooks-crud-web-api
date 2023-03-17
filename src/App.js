import React from "react";
import { Routes, Route, Link } from "react-router-dom";

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
//const MMSDK = new MetaMaskSDK(eth_requestAccounts);

//const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

//ethereum.request({ method: 'eth_requestAccounts', params: [] });

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          VolunteerWeb3
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Volunteer Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add New Activities
            </Link>
          </li>
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
          <li className="nav-item">
            <Link to={"/Minter"} className="nav-link">
            /a
            </Link>
          </li>   
          
          
          
        </div>
      </nav>

      <div className="container mt-3">
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
          <Route path="/ShowNFT" element={<ShowNFT/>}/>
          <Route path="/Minter" element={<Minter/>}/>

          
          

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
//<Route path="/ViewActivities" element={<ViewActivities/>} />
//todo

//<Route path="/Login" element={<Login/>}/>
//

export default App;

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import EventList from "./components/EventsList";
import OrganizationList from "./components/OrganizationList";
import MetamaskSDKApp from "./components/MetamaskSDKApp";

function VolunteerUI() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          VolunteerWeb3
        </a>

        <div className="navbar-nav mr-auto">
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
            <Link to={"/MetamaskSDKApp"} className="nav-link">
            MetamaskSDKApp
            </Link>
          </li>            
         
          
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/Eventslist" element={<EventList/>}/>
          <Route path="/Organizationlist" element={<OrganizationList/>}/>
          <Route path="/MetamaskSDKApp" element={<MetamaskSDKApp/>}/>
          
        </Routes>
      </div>
    </div>
  );
}
//<Route path="/ViewActivities" element={<ViewActivities/>} />
          

export default VolunteerUI;

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import EventList from "./components/EventsList";
import OrganizationList from "./components/OrganizationList";
import WelcomePageVolunteer from "./components/WelcomePageVolunteer";

function VolunteerUI() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="Eventslist" className="navbar-brand">
          VolunteerWeb3-volunteerUI
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"Eventslist"} className="nav-link">
            Eventslist
            </Link>
          </li>
                    
          <li className="nav-item">
            <Link to={"Organizationlist"} className="nav-link">
            Organizationlist
            </Link>
          </li>

          
         
          
        </div>
      </nav>

      
      <div className="container mt-3">
        <Routes>
        
        <Route path="/" element={<WelcomePageVolunteer/>}/>
          <Route path="/Eventslist" element={<EventList/>}/>
          <Route path="/Organizationlist" element={<OrganizationList/>}/>
          
        </Routes>
      </div> 

    </div>
  );
}
//<Route path="/ViewActivities" element={<ViewActivities/>} />
          

export default VolunteerUI;

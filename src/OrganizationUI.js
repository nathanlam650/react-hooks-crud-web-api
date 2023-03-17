import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import VolunteersList from "./components/VolunteersList";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventsList";
import OrganizationList from "./components/OrganizationList";
import WelcomePageOrganization from "./components/WelcomePageOrganization";

function OrganizationUI() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="" className="navbar-brand">
        VolunteerWeb3-Organization
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"addevent"} className="nav-link">
              New event
            </Link>
          </li>

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
          <Route path="/" element={<WelcomePageOrganization/>} /> 
          <Route path="/Volunteerslist" element={<VolunteersList/>}/>
          <Route path="/addevent" element={<AddEvent/>}/>
          <Route path="/Eventslist" element={<EventList/>}/>
          <Route path="/Organizationlist" element={<OrganizationList/>}/>
          
          
        </Routes>
      </div>
    </div>
  );
}
//<Route path="/ViewActivities" element={<ViewActivities/>} />
          

export default OrganizationUI;

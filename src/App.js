import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
//import ViewActivities from "./components/ViewActivities";
import Register from "./components/Register";
import VolunteersList from "./components/VolunteersList";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventsList";


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
                    
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TutorialsList/>} /> //*mean show all events*/
          <Route path="/tutorials" element={<TutorialsList/>} />
          <Route path="/add" element={<AddTutorial/>} />
          <Route path="/tutorials/:id" element={<Tutorial/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Volunteerslist" element={<VolunteersList/>}/>
          <Route path="/addevent" element={<AddEvent/>}/>
          <Route path="/Eventslist" element={<EventList/>}/>
          
        </Routes>
      </div>
    </div>
  );
}
//<Route path="/ViewActivities" element={<ViewActivities/>} />
          

export default App;

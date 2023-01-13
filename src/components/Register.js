import React, { useState } from "react";
//import React, { useState, useEffect } from "react";
//import { useParams, useNavigate } from 'react-router-dom';
import VolunteerDataService from "../services/VolunteerService";




const Register = () => {

  const initialUserState = {
    id: null,
    username: "",
    password: "",
    published: false
  };
  const [volunteer, setVolunteer] = useState(initialUserState);
  //const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setVolunteer({ ...volunteer, [name]: value });
  };
    
  const saveVolunteer = () => {
        var data = {
        username: volunteer.username,
        password: volunteer.password,
        selfIntroduction: volunteer.selfIntroduction
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

          <button onClick={saveVolunteer} className="btn btn-success">
            Submit
          </button>
        </div>
      
    </div>
  );
};

export default Register;

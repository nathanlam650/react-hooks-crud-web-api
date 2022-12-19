import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import VolunteerDataService from "../services/VolunteerService";

const Register = () => {

  const initialUserState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [volunteer, setVolunteer] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setVolunteer({ ...volunteer, [name]: value });
  };
    
  const saveVolunteer = () => {
        var data = {
        title: volunteer.title,
        description: volunteer.description
        };

        VolunteerDataService.create(data)
      .then(response => {
        setVolunteer({
        
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
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
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              className="form-control"
              id="Username"
              required
              value={volunteer.Username}
              onChange={handleInputChange}
              name="Username"
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

          <button onClick={saveVolunteer} className="btn btn-success">
            Submit
          </button>
        </div>
      
    </div>
  );
};

export default Register;

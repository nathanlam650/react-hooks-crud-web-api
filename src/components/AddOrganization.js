import React, { useState } from "react";
import DataService from "../services/OrganizationService";

const AddOrganization = () => {
  const initialOrganizationState = {
    id: null,
    username: "",
    password:"",
    description: "",
    published: false
  };
  const [organization, setOrganization] = useState(initialOrganizationState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setOrganization({ ...organization, [name]: value });
  };


  const saveEvent = () => {
    var data = {
      username: organization.username,
      description: organization.description,
      password: organization.password
    };

    DataService.create(data)
      .then(response => {
        setOrganization({
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

  const newEvent = () => {
    setOrganization(initialOrganizationState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEvent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={organization.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={organization.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              required
              value={organization.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>


          <button onClick={saveEvent} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddOrganization;

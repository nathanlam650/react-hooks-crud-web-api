import React, { useState, useEffect } from "react";
import DataService from "../services/OrganizationService";
import { Link } from "react-router-dom";

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchOrganizationname, setSearchOrganizationname] = useState("");

  useEffect(() => {
    retrieveOrganizations();
  }, []);

  const onChangeSearchOrganizationname = e => {
    const searchOrganizationname = e.target.value;
    setSearchOrganizationname(searchOrganizationname);
  };

  const retrieveOrganizations = () => {
    DataService.getAll()
      .then(response => {
        setOrganizations(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveOrganizations();
    setCurrentOrganization(null);
    setCurrentIndex(-1);
  };

  const setActiveEvent = (event, index) => {
    setCurrentOrganization(event);
    setCurrentIndex(index);
  };

  const removeAllOrganizations = () => {
    DataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByOrganizationname = () => {
    DataService.findByID(searchOrganizationname)
      .then(response => {
        setOrganizations(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Username"
            value={searchOrganizationname}
            onChange={onChangeSearchOrganizationname}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByOrganizationname}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Organization List</h4>

        <ul className="list-group">
          {organizations &&
            organizations.map((event, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEvent(event, index)}
                key={index}
              >
                {Organization.username}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllOrganizations}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentOrganization ? (
          <div>
            <h4>Organization</h4>
            <div>
              <label>
                <strong>Username:</strong>
              </label>{" "}
              {currentOrganization.username}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentOrganization.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentOrganization.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/Organization/" + currentOrganization.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Organization...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationList;

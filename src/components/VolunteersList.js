import React, { useState, useEffect } from "react";
import VolunteerDataService from "../services/TutorialService";
import { Link } from "react-router-dom";

const VolunteersList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [currentVolunteer, setCurrentVolunteer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveVolunteers();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveVolunteers = () => {
    VolunteerDataService.getAll()
      .then(response => {
        setVolunteers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveVolunteers();
    setCurrentVolunteer(null);
    setCurrentIndex(-1);
  };

  const setActiveVolunteer = (volunteer, index) => {
    setCurrentVolunteer(volunteer);
    setCurrentIndex(index);
  };

  const removeAllVolunteers = () => {
    VolunteerDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    VolunteerDataService.findByTitle(searchTitle)
      .then(response => {
        setVolunteers(response.data);
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
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Volunteers List</h4>

        <ul className="list-group">
          {volunteers &&
            volunteers.map((volunteer, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveVolunteer(volunteer, index)}
                key={index}
              >
                {volunteer.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllVolunteers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentVolunteer ? (
          <div>
            <h4>Volunteer</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentVolunteer.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentVolunteer.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentVolunteer.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/Volunteers/" + currentVolunteer.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Volunteer Job...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteersList;

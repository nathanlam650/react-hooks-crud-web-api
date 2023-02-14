import React, { useState, useEffect } from "react";
import DataService from "../services/EventService";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchEventname, setSearchEventname] = useState("");

  useEffect(() => {
    retrieveEvents();
  }, []);

  const onChangeSearchEventname = e => {
    const searchEventname = e.target.value;
    setSearchEventname(searchEventname);
  };

  const retrieveEvents = () => {
    DataService.getAll()
      .then(response => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveEvents();
    setCurrentEvent(null);
    setCurrentIndex(-1);
  };

  const setActiveEvent = (event, index) => {
    setCurrentEvent(event);
    setCurrentIndex(index);
  };

  const removeAllEvents = () => {
    DataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByEventname = () => {
    DataService.findByID(searchEventname)
      .then(response => {
        setEvents(response.data);
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
            value={searchEventname}
            onChange={onChangeSearchEventname}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEventname}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Event List</h4>

        <ul className="list-group">
          {events &&
            events.map((event, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveEvent(event, index)}
                key={index}
              >
                {event.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllEvents}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentEvent ? (
          <div>
            <h4>Event</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentEvent.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentEvent.description}
            </div>

            <div>
              <label>
                <strong>Time:</strong>
              </label>{" "}
              {currentEvent.time}
            </div>

            <div>
              <label>
                <strong>place:</strong>
              </label>{" "}
              {currentEvent.place}
            </div>

            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentEvent.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/Events/" + currentEvent.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Event...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;

import React, { useState, useEffect } from "react";
import DataService from "../services/MintedNFTService";

//import { Link } from "react-router-dom";

import {
  FacebookShareButton,
  } from "react-share"

const ShowNFT = ({ username }) => {
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
        if (username == "admin"){
          setEvents(response.data);
          console.log(response.data);
        }
        else{
          setEvents(response.data);
          console.log(username);
          console.log(response.data);
        }


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
        <h4>NFT owned by {username}</h4>

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
            
          <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{currentEvent.title}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">{currentEvent.title}</h1>
            <ul className="list-unstyled mt-3 mb-4">
              description: {currentEvent.description}
            </ul>
            <ul className="list-unstyled mt-3 mb-4">
              owner:{currentEvent.owner}
            </ul>
            <img src={"https://gateway.pinata.cloud/ipfs/" +currentEvent.photourl} width={150} height={150}>
            </img>
            
            <div className="w-100 btn btn-lg btn-outline-primary">
              <FacebookShareButton url={"https://gateway.pinata.cloud/ipfs/" +currentEvent.photourl}  >
                Share
              </FacebookShareButton>
            </div>
          </div>
        </div>
      
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
                <strong>url:</strong>
              </label>{" "}
              {currentEvent.NFTurl}
            </div>

            <div>
              <label>
                <strong>photo url:</strong>
              </label>{" "}
              {currentEvent.photourl}
            </div>

            <div>
              <img src={"https://gateway.pinata.cloud/ipfs/" +currentEvent.photourl} width={150} height={150}>
              </img>
            </div>

            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentEvent.published ? "Published" : "Pending"}
            </div>

          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a NFT...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowNFT;

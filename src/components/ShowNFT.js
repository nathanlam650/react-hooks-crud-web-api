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
        if (username == "admin") {
          setEvents(response.data);
          console.log(response.data);
        }
        else {
          for (const dataloop of response.data) {
            if (dataloop.owner == username) {
              setEvents((events) => ([...events, dataloop]));
            }
          }
          //console.log(events);
          //console.log(response.data);
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
    <div className="list">
      <div className="col-md-8">
        <div className="row input-group mb-3">
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
        <h4 className="row display-4 fw-normal" >NFT owned by {username}</h4>
      </div>



      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">

        {events &&
          events.map((event, index) => (

            <div class="card mb-4 rounded-3 shadow-sm">
              <img class="card-img-top" src={"https://gateway.pinata.cloud/ipfs/" + event.photourl} width={150} height={150}>
              </img>

              <div className="card-header py-3">
                <h4 className="my-0 fw-normal">{event.title}</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">{event.title}</h1>
                <ul className="list-unstyled mt-3 mb-4">
                  description: {event.description}
                </ul>
                <ul className="list-unstyled mt-3 mb-4">
                  owner:{event.owner}
                </ul>


                <div className="w-100 btn btn-lg btn-outline-primary">
                  <FacebookShareButton url={"https://gateway.pinata.cloud/ipfs/" + event.photourl}  >
                    Share
                  </FacebookShareButton>
                </div>
              </div>
            </div>
          ))}
      </div>



      <button
        className="m-3 btn btn-sm btn-danger"
        onClick={removeAllEvents}
      >
        Remove All
      </button>
    </div>
  );
};

export default ShowNFT;

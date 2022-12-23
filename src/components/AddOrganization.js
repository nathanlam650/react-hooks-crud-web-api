import React, { useState } from "react";
import DataService from "../services/EventService";

const AddOrganization = () => {
  const initialEventState = {
    id: null,
    title: "",
    description: "",
    time: "",
    place: "",
    published: false
  };
  const [eventhook, setEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEvent({ ...eventhook, [name]: value });
  };


  const saveEvent = () => {
    var data = {
      title: eventhook.title,
      description: eventhook.description,
      place: eventhook.place,
      time: eventhook.time
    };

    DataService.create(data)
      .then(response => {
        setEvent({
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
    setEvent(initialEventState);
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={eventhook.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={eventhook.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              className="form-control"
              id="time"
              required
              value={eventhook.time}
              onChange={handleInputChange}
              name="time"
            />
          </div>

          <div className="form-group">
            <label htmlFor="place">place</label>
            <input
              type="text"
              className="form-control"
              id="place"
              required
              value={eventhook.place}
              onChange={handleInputChange}
              name="place"
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

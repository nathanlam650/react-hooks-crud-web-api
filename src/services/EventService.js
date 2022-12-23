import http from "../http-common";

const getAll = () => {
  return http.get("/events");
};

const get = id => {
  return http.get(`/events/${id}`);
};

const create = data => {
  return http.post("/events", data);
};

const update = (id, data) => {
  return http.put(`/events/${id}`, data);
};

const remove = id => {
  return http.delete(`/events/${id}`);
};

const removeAll = () => {
  return http.delete(`/events`);
};

const findByID = title => {
  return http.get(`/events?title=${title}`);
};



const EventsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByID,
};

export default EventsService;

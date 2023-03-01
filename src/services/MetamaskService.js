import http from "../http-common";

const getAll = () => {
  return http.get("/metamask");
};

const get = id => {
  return http.get(`/metamask/${id}`);
};

const create = data => {
  return http.post("/metamask", data);
};

const EventsService = {
  getAll,
  get,
  create,
};

export default EventsService;


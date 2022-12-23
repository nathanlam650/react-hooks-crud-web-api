import http from "../http-common";

const getAll = () => {
  return http.get("/organization");
};

const get = id => {
  return http.get(`/organization/${id}`);
};

const create = data => {
  return http.post("/organization", data);
};

const update = (id, data) => {
  return http.put(`/organization/${id}`, data);
};

const remove = id => {
  return http.delete(`/organization/${id}`);
};

const removeAll = () => {
  return http.delete(`/organization`);
};

const findByID = title => {
  return http.get(`/organization?title=${title}`);
};



const OrganizationsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByID,
};

export default OrganizationsService;

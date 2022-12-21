import http from "../http-common";

const getAll = () => {
  return http.get("/volunteers");
};

const get = id => {
  return http.get(`/volunteers/${id}`);
};

const create = data => {
  return http.post("/volunteers", data);
};

//router.post("/newuser", volunteers.create);

const update = (id, data) => {
  return http.put(`/volunteers/${id}`, data);
};

const remove = id => {
  return http.delete(`/volunteers/${id}`);
};

const removeAll = () => {
  return http.delete(`/volunteers`);
};

const findByTitle = title => {
  return http.get(`/volunteers?title=${title}`);
};



const createVolunteer = data => {
  return http.post("/volunteers", data);
};


const VolunteersService = {
  createVolunteer,
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByUsername: findByTitle
};

export default VolunteersService;

import http from "../http-common";

const getAll = () => {
  return http.get("/MintedNFT");
};

const get = id => {
  return http.get(`/MintedNFT/${id}`);
};

const create = data => {
  return http.post("/MintedNFT", data);
};

const update = (id, data) => {
  return http.put(`/MintedNFT/${id}`, data);
};

const remove = id => {
  return http.delete(`/MintedNFT/${id}`);
};

const removeAll = () => {
  return http.delete(`/MintedNFT`);
};

const findByID = title => {
  return http.get(`/MintedNFT?title=${title}`);
};



const MintedNFTService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByID,
};

export default MintedNFTService;

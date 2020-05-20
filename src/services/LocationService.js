import http from "../http-common";

const getAll = () => {
  return http.get("/locations");
};

const get = id => {
  return http.get(`/locations/${id}`);
};

const create = data => {
  return http.post("/locations", data);
};

const update = (id, data) => {
  return http.put(`/locations/${id}`, data);
};

const remove = id => {
  return http.delete(`/locations/${id}`);
};

const findByTitle = title => {
  return http.get(`/locations?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle
};

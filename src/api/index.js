import axios from "axios";

const API = axios.create({ baseURL: "https://stage.api.sloovi.com" });
const user = JSON.parse(localStorage.getItem("profile"))?.results?.token;
const company_id = JSON.parse(localStorage.getItem("profile"))?.results
  ?.company_id;

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${user}`;
  }
  return req;
});

const lead = "lead_465c14d0e99e4972b6b21ffecf3dd691";

export const login = (formData) => API.post("/login", formData);
export const fetchPosts = (company_id) =>
  API.get(`/task/${lead}?company_id=${company_id}`);

export const fetchSinglePost = (id) =>
  API.get(`/task/${lead}/${id}?company_id=${company_id}`);

export const deletePost = (id) =>
  API.delete(`/task/${lead}/${id}?company_id=${company_id}`);

export const createPost = (formData) =>
  API.post(`/task/${lead}?company_id=${company_id}`, formData);

export const updatePost = (id, formData) =>
  API.put(`/task/${lead}/${id}?company_id=${company_id}`, formData);

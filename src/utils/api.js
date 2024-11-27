import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002", // Ensure this matches your JSON server's address
});

export default api;

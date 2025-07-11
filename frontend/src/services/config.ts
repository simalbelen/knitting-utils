import axios from "axios";


export const API = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "Content-type": "application/json",
  },
});

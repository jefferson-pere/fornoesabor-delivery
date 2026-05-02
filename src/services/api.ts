import axios from "axios";

export const api = axios.create({
  baseURL: "https://fornoesabor-backend.onrender.com",
});

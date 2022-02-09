import axios from "axios";

export const api = axios.create({
  baseURL: "https://consulta-encomendas.herokuapp.com",
});

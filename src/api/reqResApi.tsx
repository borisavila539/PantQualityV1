import axios from "axios";
import { APIFinanzas, APILogin } from "../components/Constant";

export const reqResApi = axios.create({
    baseURL: APILogin,
    headers: {
        "Content-type": "application/json"
      }
});

export const reqResApiFinanza = axios.create({
  baseURL: APIFinanzas
});
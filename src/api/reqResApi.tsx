import axios from "axios";
import { APILogin } from "../components/Constant";

export const reqResApi = axios.create({
    baseURL: APILogin,
    headers: {
        "Content-type": "application/json"
      }
});
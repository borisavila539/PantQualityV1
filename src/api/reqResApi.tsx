import axios from "axios";
import { APIFinanzas } from "../components/Constant";

export const reqResApiFinanza = axios.create({
  baseURL: APIFinanzas
});
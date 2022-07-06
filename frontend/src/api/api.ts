import axios from "axios";
import { Iproduct } from "../type/productType";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});

export const productsAPI = {
  getProducts() {
    return instance
      .get<Iproduct[]>("products")
      .then((response) => response.data);
  },
};

import axios from "axios";
import { Ilogin, Iregister } from "../type/authType";
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

export const authAPI = {
  loginUser({ email, password }: Ilogin) {
    return instance.post("api/login", { email, password });
  },

  registerUser({ name, email, password }: Iregister) {
    return instance.post("api/register", { name, email, password });
  },
};

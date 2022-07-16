import axios from "axios";
import { Ilogin } from "../type/authType";
import { Iregister } from "../type/registerType";
import { Iproduct } from "../type/productType";

interface IknownError {
  errorMessage: string;
}

export interface IUser {
  token: string;
  refresh_token: string;
  error: IknownError;
}

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

  registerUser({ name, email, password, _id }: Iregister) {
    return instance.post("api/register", { name, email, password });
  },
};

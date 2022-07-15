export interface Iregister {
  name: string;
  email: string;
  password: string;
  _id: string;
}

export interface IregisterState {
  token: string | Iregister;
  email: string;
  password: string;
  name: string;
  isAuth: boolean;
  _id: string;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
}

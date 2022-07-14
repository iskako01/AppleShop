import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { AppDispatch } from "../../redux/store";

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSetEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.preventDefault();
    // dispatch(registerUser({
    // 	email, password,
    // 	_id: ""
    // }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          onChange={(e) => handleSetEmail(e)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => handleSetPassword(e)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

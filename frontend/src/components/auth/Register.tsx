import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { AppDispatch, AppStore } from "../../redux/store";
import { IregisterState } from "../../type/registerType";
import { StyledForm } from "./StyledForm";

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { registerStatus, registerError } = useSelector<
    AppStore,
    IregisterState
  >((state) => state.auth);

  const handleSetName = (e: any) => {
    setName(e.target.value);
  };

  const handleSetEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e.preventDefault();
    dispatch(
      registerUser({
        name,
        email,
        password,
        _id: "",
      })
    );
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          onChange={(e) => handleSetName(e)}
          placeholder="Name"
        />
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
        <button type="submit">
          {registerStatus === "pending" ? "Submitting" : "Register"}
        </button>

        {registerStatus === "rejected" ? <p>{registerError}</p> : null}
      </StyledForm>
    </div>
  );
};

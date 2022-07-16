import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/authSlice";
import { AppDispatch, AppStore } from "../../redux/store";
import { IregisterState } from "../../type/registerType";
import { StyledForm } from "./StyledAuth";

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useSelector<AppStore, IregisterState>((state) => state.auth);

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

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id,navigate]);

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
          {auth.registerStatus === "pending" ? "Submitting" : "Register"}
        </button>

        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError}</p>
        ) : null}
      </StyledForm>
    </div>
  );
};

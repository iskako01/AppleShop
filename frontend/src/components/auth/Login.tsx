import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import { AppDispatch, AppStore } from "../../redux/store";
import { IregisterState } from "../../type/registerType";
import { StyledForm } from "./StyledAuth";

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useSelector<AppStore, IregisterState>((state) => state.auth);

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
      loginUser({
        email,
        password,
        
      })
    );
  };

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
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
        <button type="submit">
          {auth.loginStatus === "pending" ? "Submitting" : "Login"}
        </button>

        {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
      </StyledForm>
    </div>
  );
};

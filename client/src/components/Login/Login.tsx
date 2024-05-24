import React, { useRef } from "react";
import "./login.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IP } from "../utils/IP";
interface props {
  updateAuth: (data: any) => void;
}
export const Login: React.FC<props> = ({ updateAuth }) => {
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const baseUrl = window.location.origin;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const handleLoginBtn = () => {
    const body = {
      username: userName.current?.value,
      password: password.current?.value,
    };
    axios
      .post(IP.API + "login", body)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        updateAuth(res.data.isLogin);
        navigate(currentPath);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="wrapper">
      <div className="logo">
        <img src={baseUrl + "/logo3.jpeg"} alt="" />
      </div>
      <div className="text-center mt-4 name">KSCPCR</div>
      <div className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            ref={userName}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            ref={password}
          />
        </div>
        <button className="btn mt-3" onClick={handleLoginBtn}>
          Login
        </button>
      </div>
      <div className="text-center fs-6">
        <a href="#">Forget password?</a> or <a href="#">Sign up</a>
      </div>
    </div>
  );
};

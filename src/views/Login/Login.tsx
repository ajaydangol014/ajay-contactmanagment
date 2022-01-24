import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const redirect = useNavigate();
  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };
  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:5000/users/${email}/${password}`)
      .then((res) => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        redirect("/dashboard/");
        window.location.reload();
      })
      .catch((err) => {
        alert("Wrong email or password");
      });
  };
  return (
    <div className="container container-center">
      <div className="login-page">
        <div className="form">
          <h2>
            <strong>Login</strong>
          </h2>
          <form className="login-form" onSubmit={onFormSubmit}>
            <input type="email" placeholder="E-mail" onChange={onChangeEmail} />
            <input
              type="password"
              placeholder="password"
              onChange={onChangePassword}
            />
            <button>Login</button>
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

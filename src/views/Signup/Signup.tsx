import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Login/login.css";

const Signup = () => {
  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onChangeName = (event: any) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    const formdata = {
      username: username,
      email: email,
      password: password,
    };

    await axios.post("http://localhost:5000/users/add", formdata).then(() => {
      console.log("Test");
    });
  };
  return (
    <div className="container container-center">
      <div className="login-page">
        <div className="form">
          <h2>Signup</h2>
          <form className="login-form" onSubmit={onFormSubmit}>
            <input
              type="text"
              placeholder="Name"
              required
              onChange={onChangeName}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={onChangePassword}
            />
            <input
              type="email"
              placeholder="Email address"
              required
              onChange={onChangeEmail}
            />
            <button>Signup</button>
            <p className="message">
              Already registered? <Link to="/">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

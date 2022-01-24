import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <header className="header">
        <div className="logo">
          <h2>Contact Management</h2>
        </div>
        <div className="nav">
          <div onClick={logout}>Logout</div>
        </div>
      </header>
    </>
  );
};

export default Header;

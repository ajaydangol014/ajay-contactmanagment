import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../views/Login/Login";
import Signup from "../views/Signup/Signup";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;

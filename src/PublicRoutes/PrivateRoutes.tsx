import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard/Dashboard";
import CreateContact from "../views/Form/CreateContact";
import UpdateContact from "../views/Form/UpdateContact";
import ViewContact from "../views/Form/ViewContact";

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact/create" element={<CreateContact />} />
        <Route path="/contact/update/:id" element={<UpdateContact />} />
        <Route path="/contact/view/:id" element={<ViewContact />} />
      </Routes>
    </>
  );
};

export default PrivateRoutes;

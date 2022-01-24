import React from "react";
import "./App.css";
import PublicRoutes from "./PublicRoutes/PublicRoutes";
import PrivateRoutes from "./PublicRoutes/PrivateRoutes";

function App() {
  const token = localStorage.getItem("token");
  return <>{!token ? <PublicRoutes /> : <PrivateRoutes />}</>;
}

export default App;

import React from "react";
import Headers from "../../components/header/header";
import ListPage from "../ListPage/ListPage";
import "./dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userid = localStorage.getItem("id");

  return (
    <>
      <Headers />
      <div className="dashboard__container">
        <div className="dashboard__content">
          <div className="dashboard__welcome">
            <h3>Hello dear!</h3>
            <span>Here is your contact list!!</span>
          </div>
          <Link to="/contact/create">Create Contact</Link>
        </div>
        <ListPage id={userid} />
      </div>
    </>
  );
};

export default Dashboard;

import Headers from "../../components/header/header";
import "./form.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ViewContact() {
  const [contactData, setContactList] = useState<any[]>([]);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/contact/view/${id}`).then((response) => {
      console.log(response.data);
      setName(response.data[0].fullname);
      setEmail(response.data[0].email);
      setNumber(response.data[0].phonenumber);
    });
  }, []);
  return (
    <>
      <Headers />
      <div className="top-section">
        <h2>View Contact: {name}</h2>
        <div className="back-btn">
          <Link to="/dashboard">Back</Link>
        </div>
      </div>
      <div className="view">
        <div className="row">
          <h3>Full Name</h3>
          <span>{name}</span>
        </div>
        <div className="row">
          <h3>Email</h3>
          <span>{email}</span>
        </div>
        <div className="row">
          <h3>Phone Number</h3>
          <span>{number}</span>
        </div>
      </div>
    </>
  );
}

export default ViewContact;

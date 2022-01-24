import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./form.css";

const Form = (props: any) => {
  const userid = localStorage.getItem("id");
  const { mode } = props;
  const redirect = useNavigate();
  const { id } = useParams();
  // const [listdata, setContactData] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const onChangeName = (event: any) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const onChangeNumber = (event: any) => {
    setNumber(event.target.value);
  };

  const onFormSubmit = async (event: any) => {
    event.preventDefault();
    const formdata = {
      fullname: name,
      email: email,
      phonenumber: number,
      contactid: userid,
    };

    if (mode) {
      await axios
        .post(`http://localhost:5000/contact/update/${id}`, formdata)
        .then(() => {
          console.log("Test");
        });
    } else {
      await axios
        .post("http://localhost:5000/contact/add", formdata)
        .then(() => {
          redirect(`/dashboard`);
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/contact/view/${id}`).then((response) => {
      setName(response.data[0].fullname);
      setEmail(response.data[0].email);
      setNumber(response.data[0].phonenumber);
    });
  }, []);

  return (
    <div className="form-wrap">
      <div className="top-section">
        <h2></h2>
        <div className="back-btn">
          <Link to="/dashboard">Back</Link>
        </div>
      </div>
      <div className="wrap">
        <h4>{mode ? "Update Contact" : "Create Contact"}</h4>
        <br />
        <form onSubmit={onFormSubmit}>
          <label>Full Name</label>
          <input
            id="f_first"
            required
            type="text"
            onChange={onChangeName}
            value={mode && name}
          />
          <label>Phone Number</label>
          <input
            id="f_last"
            required
            type="text"
            onChange={onChangeNumber}
            value={mode && number}
          />
          <label>Email</label>
          <input
            id="f_password"
            required
            type="email"
            onChange={onChangeEmail}
            value={mode && email}
          />
          <button type="submit" className="btn btn-blue">
            {mode ? "Update Contact" : "Create Contact"}
          </button>
          <div className="cb"></div>
        </form>
      </div>
    </div>
  );
};

export default Form;

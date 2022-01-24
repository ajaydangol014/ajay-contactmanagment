import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./listpage.css";
const ListPage = (props: any) => {
  const [contactData, setContactList] = useState<any[]>([]);
  // const [favorite]
  const { id } = props;

  const [pname, setName] = useState("");
  const [pnumber, setNumber] = useState("");
  const [favorite, setFav] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/contact/${id}`)
      .then((response) => {
        setContactList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteList = (id: any) => {
    axios
      .delete(`http://localhost:5000/contact/delete/${id}`)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  // get Data by id
  const getDataById = async (id: any) => {
    await axios
      .get(`http://localhost:5000/contact/get/${id}`)
      .then((response) => {
        console.log(response.data._id, response.data.favorite);
        addToFavourite(response.data._id, response.data.favorite);
      })
      .catch((err) => console.log(err));
  };

  // add to favorite

  const addToFavourite = async (id: any, fav: any) => {
    await axios
      .get(`http://localhost:5000/contact/favorite/${id}/${fav}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {contactData.map((data: any, key: number) => {
        return (
          <div className="contact-list">
            <div className="contact-list__box">
              <div className="contact-list__content">
                <div className="contact-list__image"></div>
                <div className="contact-list__name">
                  <div className="contact-list__name-link">
                    <Link className="" to={`/contact/view/${data._id}`}>
                      <h4>{data.fullname}</h4>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="contact-list__icons">
                <div className="contact-list__edit">
                  <a
                    className={`btn ${
                      data.favorite == true ? "btn-black" : "btn-blue"
                    }`}
                    href="javascript:void()"
                    onClick={() => {
                      getDataById(data._id);
                    }}
                  >
                    {data.favorite == true
                      ? "Added to Favorites"
                      : "Add to Favorite"}
                  </a>
                </div>
                <div className="contact-list__edit">
                  <Link
                    to={`/contact/update/${data._id}`}
                    className="btn btn-green"
                  >
                    Update
                  </Link>
                </div>
                <a
                  href=""
                  className="contact-list__delete btn btn-red"
                  onClick={() => {
                    deleteList(data._id);
                  }}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListPage;
function favoriteList() {
  throw new Error("Function not implemented.");
}

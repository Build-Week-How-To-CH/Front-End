//SINGLE HOW-TO
// edit / delete functionality here

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import HowTo from "./HowTo";

const initialCard = {
  title: "",
  author: "",
  category: "",
  id: "",
};

const HowToList = (props) => {
  const [howTos, setHowTos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(initialCard);
  const history = useHistory();
  const [howToList, setHowToList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/howtos")
      .then((response) => {
        setHowToList(response.data.howtos);
      });
    if (localStorage.getItem("isAdmin") === "false") {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, []);

  const deleteCard = (e) => {
    axiosWithAuth()
      .delete(`/api/howtos/${e.id}`)
      .then((res) => {
        setEdit(false);
        setCardToEdit(initialCard);
        fetchHowToes();
      })
      .catch((err) => console.log(err, "lol"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post(`/api/howtos`, cardToEdit)
      .then((res) => {
        setCardToEdit(initialCard);
        fetchHowToes();
      })
      .catch((err) => console.log(err));
  };

  const fetchHowToes = () => {
    axiosWithAuth()
      .get(`/api/howtos`)
      .then((res) => {
        setHowToList(res.data.howtos);
        fetchHowToes();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchHowToes();
  }, []);
  
  console.log(isAdmin);

  return (
    <div>
      <div onSubmit={handleSubmit} className="howToListContainer">
        <>
          {howToList.map((ht, toes) => {
            // console.log("Here", ht);
            return (
              <Link id="linksDash" key={ht.id} to={`/howtos/${ht.id}`}>
                <h2>{ht.title}</h2>
                <h3>{ht.category}</h3>

                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteCard(ht);
                    }}
                  >
                    Delete
                  </button>
                )}
              </Link>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default HowToList;

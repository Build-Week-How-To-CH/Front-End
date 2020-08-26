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
  const [edit, setEdit] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(initialCard);
  const history = useHistory();
  const [howToList, setHowToList] = useState([]);

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get("/api/howtos")
  //     .then((response) => {
  //       // console.log(response);
  //       setHowToList(response.data.howtos);
  //     });
  // }, []);

  const editCard = (card) => {
    setEdit(true);
    setCardToEdit(card);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/howtos/${e.id}`, cardToEdit)
      .then((res) => {
        setEdit(false);
        setCardToEdit(initialCard);
      })
      .catch((err) => err);
  };

  const deleteCard = (e) => {
    axiosWithAuth()
      .delete(`/api/howtos/${e.id}`)
      .then((res) => {
        setEdit(false);
        setCardToEdit(initialCard);
      })
      .catch((err) => console.log(err, "lol"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post(`/api/howtos`, cardToEdit)
      .then((res) => {
        setCardToEdit(initialCard);
      })
      .catch((err) => console.log(err));
  };

  const fetchHowToes = () => {
    axiosWithAuth()
      .get(`/api/howtos`)
      .then((res) => {
        setHowToList(res.data.howtos);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchHowToes();
  }, []);

  fetchHowToes()

  return (
    // ***BEA working on cards***
    // when you click on a how on the list in dashboard it routes to the specific ID
    <div>
      <div className="howToListContainer">
        <>
          {howToList.map((ht, toes) => {
            // console.log("Here", ht);
            return (
              <Link id="linksDash" key={ht.id} to={`/howtos/${ht.id}`}>
                <h2>{ht.title}</h2>
                <h3>{ht.category}</h3>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteCard(ht);
                  }}
                >
                  Delete
                </button>
              </Link>
            );
          })}
        </>
      </div>

      {/* GALO */}

      {howToList.map((toes) => (
        <div className="howToCards" key={toes.id}>
          <h2>{toes.title}</h2>
          <h3>{toes.author}</h3>
          <p>{toes.category}</p>
          <button onClick={() => editCard(toes)}>Edit</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteCard(toes);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      {edit ? (
        <form onSubmit={saveEdit}>
          <h2>Edit How-To</h2>
          <label>
            Title:
            <input
              onChange={(e) =>
                setCardToEdit({ ...cardToEdit, title: e.target.value })
              }
              value={cardToEdit.title}
            />
          </label>
          <div>
            <button type="submit">Save</button>
            <button
              onClick={() => {
                setEdit(false);
                setCardToEdit(initialCard);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Add How-To</h2>
          <label>Title:</label>
          <input
            onChange={(e) =>
              setCardToEdit({ ...cardToEdit, title: e.target.value })
            }
            value={cardToEdit.title}
          />
        </form>
      )}
    </div>
  );
};

export default HowToList;

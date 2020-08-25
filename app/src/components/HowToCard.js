//SINGLE HOW-TO
// edit / delete functionality here

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialCard = {
  title: "",
  author: "",
  category: "",
};

export const HowToCard = () => {
  const [howTos, setHowTos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(initialCard);

  const editCard = (card) => {
    setEdit(true);
    setCardToEdit(card);
  };

  const saveEdit = (e) => {
    axiosWithAuth()
      .put(`/api/howtos/${cardToEdit.id}`, cardToEdit)
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
      .catch((err) => err);
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

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/howtos`)
      .then((res) => {
        console.log(res.data.howtos);
        setHowTos(res.data.howtos);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      {howTos.map((toes) => (
        <div key={toes.id}>
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
    </div>
  );
};

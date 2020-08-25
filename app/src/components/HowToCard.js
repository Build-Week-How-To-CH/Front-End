//SINGLE HOW-TO
// edit / delete functionality here

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { deleteHowTo } from "../store/actions";

const initialCard = {
  title: "",
  author: "",
  category: "",
  id: "",
};

const HowToCard = (props) => {
  const [howTos, setHowTos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(initialCard);

  const editCard = (card) => {
    setEdit(true);
    setCardToEdit(card);
  };
  console.log(cardToEdit.id);
  const saveEdit = (e) => {
    e.preventDefault();
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
        console.log(res);
        setEdit(false);
        setCardToEdit(initialCard);
      })
      .catch((err) => console.log(err, "lol"));
  };

  // const deleteHowTo = e => {
  //   e.preventDefault()
  //   console.log(props.id)
  //   props.deleteHowTo(howTos.id)
  // }

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

export default connect(null, { deleteHowTo })(HowToCard);

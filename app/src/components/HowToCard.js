//SINGLE HOW-TO
// edit / delete functionality here

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { deleteHowTo } from "../store/actions";
import { useHistory } from "react-router-dom";

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
  const history = useHistory()

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

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/howtos`)
      .then((res) => {
        setHowTos(res.data.howtos);
      })
      .catch((error) => console.log(error));
  }, [howTos, edit, cardToEdit]);
  return (
    <div>
      {howTos.map((toes) => (
        <div key={toes.id}>
          <h2>{toes.title}</h2>
          <h3>{toes.author}</h3>
          <p>{toes.category}</p>
          {/* <p>{toes.content}</p> */}
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

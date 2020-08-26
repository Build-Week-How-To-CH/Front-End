import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const HowToEdit = () => {
  const history = useHistory();
  const [card, setCard] = useState(null);
  const params = useParams();
  const initialCard = {
    title: "",
    author: "",
    category: "",
    id: params.id,
  };
  const [cardToEdit, setCardToEdit] = useState(initialCard);

  const fetchHowTo = (id) => {
    axiosWithAuth()
      .get(`/api/howtos/${id}`)
      .then((res) => setCard(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    fetchHowTo(params.id);
  }, [params.id]);

  const putHowTo = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/howtos/${params.id}`, cardToEdit)
      .then((res) => {
        // history.push(`/api/howtos/${params.id}`)
        console.log(res);
      })
      .catch((err) => console.log(err, "lol"));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCardToEdit({
      ...cardToEdit,
      [name]: value,
    });
  };

  // console.log(card.howto)

  return (
    <div>
      <form onSubmit={putHowTo}>
        <input
          name="title"
          placeholder="change the title..."
          type="text"
          value={cardToEdit.title}
          onChange={onChange}
        />
        <input
          name="category"
          placeholder="change the category..."
          type="text"
          value={cardToEdit.category}
          onChange={onChange}
        />
        <input
          name="content"
          placeholder="change the content..."
          type="text"
          value={cardToEdit.content}
          onChange={onChange}
        />
        <button>save</button>
      </form>
    </div>
  );
};

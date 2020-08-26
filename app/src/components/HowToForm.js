// HOW-TO form create a new How-To 
// ADD/SUBMIT functionality

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"

import {axiosWithAuth} from '../utils/axiosWithAuth'


const initialFormValues = {
    title: '',
    category: '',
    content: '',
}

export default function HowToForm(props) {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formOpen, setFormOpen] = useState(false)
    const [howTo, setHowTo] = useState(null)
    const history = useHistory();

    const handleChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };

  const closeEditForm = () => {
      setFormOpen(false)
      setFormValues(initialFormValues)
  }

    const postNewHowTo = (e) => {
        e.preventDefault();
        const postData = {
          title: formValues.title,
          category: formValues.category,
          content: formValues.content,
          user_id: 1,
        };
        axiosWithAuth()

          .post("/api/howtos", postData)
          .then((res) => {
            console.log(res)
            props.getHowTosList();
            setFormValues(res.data)
            // history.push("/");
          })
          .catch((error) => console.log(error));
      };
  return (
    <div>
      <form onSubmit={postNewHowTo}>
        <h2>Add a New How-To</h2>
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          type="text"
          id="name"
          name="title"
          value={formValues.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="catergory">Category:&nbsp;</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formValues.category}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="content">Content:&nbsp;</label>
        <textarea
          id="content"
          name="content"
          value={formValues.content}
          onChange={handleChange}
          placeholder="Add your steps here"
        />
        <br />
        <br />
        <button onClick={postNewHowTo}>Save Changes</button>&nbsp;
        <button onClick={closeEditForm}>Cancel</button>
      </form>
    </div>
  );
}

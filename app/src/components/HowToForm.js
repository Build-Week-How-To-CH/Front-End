// HOW-TO form create a new How-To 
// ADD/SUBMIT functionality

import React, { useState } from "react";
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
    const history = useHistory();

    const handleChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };

    const postNewHowTo = (e) => {
        e.preventDefault();
        const postData = {
          title: formValues.title,
          category: formValues.category,
          content: formValues.content
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
        <label htmlFor="username">Title:&nbsp;</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="category">Category:&nbsp;</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formValues.category}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="steps">Content:&nbsp;</label>
        <textarea
          id="conent"
          name="content"
          value={formValues.content}
          onChange={handleChange}
        />
        <br />
        <br />
        <button>Save Changes</button>&nbsp;
        <button>Cancel</button>
      </form>
    </div>
  );
}

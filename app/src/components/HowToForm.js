// HOW-TO form create a new How-To 
// ADD/SUBMIT functionality

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
          content: formValues.content,
          user_id: 1,
        };
        axiosWithAuth()
          .post("https://bw-how-2.herokuapp.com/api/howtos", postData)
          .then((res) => {
            props.getHowTosList();
            history.push("/dashboard");
          })
          .catch((error) => console.log(error));
      };

  return (
    <div>
      <form>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Title"
        />
        <br />
        <br />
        <input
          type="text"
          id="category"
          name="category"
          value={formValues.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <br />
        <br />
        <textarea
          id="content"
          name="content"
          value={formValues.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <br />
        <br />
        <button onClick={postNewHowTo}>Save Changes</button>&nbsp;
        <button>Cancel</button>
      </form>
      
    </div>
  );
}

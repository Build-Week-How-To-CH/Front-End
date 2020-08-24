import React, { useState, useEffect } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "./App.css";
import SignUp from "./components/SignUp";
import formSchema from "./components/FormSchema";
import { Login } from "./components/Login";

// SIGNUP

const initialFormValues = {
  email: "",
  username: "",
  password: "",
};

const initialFormErrors = {
  email: "",
  username: "",
  password: "",
};

const initialDisabled = true;

function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  // const getUsers = () => {
  //   axios
  //     .get("https://bw-how-2.herokuapp.com/api/users")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       debugger;
  //     });
  // };

  // const postNewUser = (newUser) => {
  //   axios
  //     .post("https://bw-how-2.herokuapp.com/api/users")
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       debugger;
  //     })
  //     .finally(() => {
  //       setFormValues(initialFormValues);
  //     });
  // };

  // const inputChange = (name, value) => {
  //   yup
  //     .reach(formSchema, name)
  //     .validate(value)
  //     .then((valid) => {
  //       setFormErrors({
  //         ...formErrors,
  //         [name]: "",
  //       });
  //     });
  // };

  // const submit = () => {
  //   const newUser = {
  //     name: formValues.email.trim(),
  //     username: formValues.username.trim(),
  //     password: formValues.password.trim(),
  //   };
  //   postNewUser(newUser);
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // useEffect(() => {
  //   formSchema.isValid(formValues).then((valid) => {
  //     setDisabled(!valid);
  //   });
  // }, [formValues]);

  return (
    <div className="App">
      <Route path="/">
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink component={Login} to="/login">
          Log In
        </NavLink>
        {/* <SignUp
          values={formValues}
          inputChange={inputChange}
          submit={submit}
          disabled={disabled}
          errors={formErrors}
        /> */}
      </Route>
    </div>
  );
}

export default App;

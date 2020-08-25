import React, { useState, useEffect } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "./App.css";
import SignUp from "./components/SignUp";
import formSchema from "./components/FormSchema";
import { Login } from "./components/Login";
import { axiosWithAuth } from './utils/axiosWithAuth';

// SIGNUP

const initialFormValues = {
  username: '',
  password: '',
}

const initialFormErrors = {
  username: '',
  password: '',
}

const initialDisabled = true;

function App() {

  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://bw-how-2.herokuapp.com/api/users')
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewUser = newUser => {
    axiosWithAuth()
    .post('/api/auth/register', newUser)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        setFormValues(initialFormValues);
        console.log(res.data)
      })
      .catch(err => {
        debugger
      })
  }


  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]:err.errors[0]
        })
      })
      setFormValues({
        ...formValues,
        [name]:value
      })
  }

  const submit = () => {
    const newUser = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues])

  return (
    <div className="App">
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/login" />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp
            values={formValues}
            inputChange={inputChange}
            submit={submit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
      </Switch>
  </div>
  );
}

export default App;

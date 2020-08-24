import React, { useState, useEffect } from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import './App.css';
import SignUp from './components/SignUp';
import formSchema from './components/FormSchema'

// SIGNUP

const initialFormValues = {
  email: '',
  username: '',
  password: '',
}

const initialFormErrors = {
  email: '',
  username: '',
  password: '',
}

const initialDisabled = true

function App() {

  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([...users, res.data.data])
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
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
      name: formValues.email.trim(),
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
      <Route path = '/'>
        <NavLink to = '/signup'>Sign Up</NavLink>
        <NavLink to = '/login'>Log In</NavLink>
        <SignUp
          values = {formValues}
          inputChange = {inputChange}
          submit = {submit}
          disabled = {disabled}
          errors = {formErrors}
        />
      </Route>
    </div>
  );
}

export default App;

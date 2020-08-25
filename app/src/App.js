import React, { useState, useEffect } from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "./App.css";
import SignUp from "./components/SignUp";
import formSchema from "./components/FormSchema";
import { Login } from "./components/Login";
// import { axiosWithAuth } from './utils/axiosWithAuth';
import Dashboard from './components/Dashboard'

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

const App =() => {

  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const history = useHistory();

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
    axios
    .post('https://bw-how-2.herokuapp.com/api/auth/register', newUser)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        setFormValues(initialFormValues);
        history.push('/dashboard')
      })
      .catch(err => {
        console.log(err)
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
      isAdmin: false,
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
      {/* <h3>New here? </h3>
      <NavLink to="/signup"> Create a Account!</NavLink>
      <h3>Returning Users</h3>
      <NavLink to="/login" />  */}
      {/* we can eventually add these to the nav bar for UNIT 1 ppl */}
      
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
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
      </Switch>
  </div>
  );
}

export default App;

import React, {useState} from "react";
import { NavLink, useHistory, Route } from "react-router-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const initialState = {
  username: "",
  password: "",
};

export const Login = () => {
  const [creds, setCreds] = useState(initialState);
  const history = useHistory();

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("https://bw-how-2.herokuapp.com/api/auth/login", creds) //need to add an endpoint
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard"); //endpoint for dashboard
      })
      .catch((err) => err);
  };

  return (
    <div>
      <Route path="/login">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </Route>
      <h4>Login</h4>
      <form onSubmit={login}>
        <TextField
          variant="outlined"
          name="username"
          type="text"
          label="Username"
          value={creds.username}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          name="password"
          type="password"
          label="Password"
          value={creds.password}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">Log In</Button>
        <br></br>
        <div className="makeLink" onClick={() => history.push('/signup')}>Don't have an account? Click to sign up.</div>
      </form>
    </div>
  );
}

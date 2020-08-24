import React, {useState} from "react";
import { NavLink, useHistory, Route } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
    axiosWithAuth()
      .post("https://bw-how-2.herokuapp.com/api/auth/login", creds) //need to add an endpoint
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        history.push("/"); //endpoint for dashboard
      })
      .catch((err) => err);
  };

  return (
    <div>
      <Route path="/login">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </Route>
      <form onSubmit={login}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={creds.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={creds.password}
          onChange={handleChange}
        />
        <button>Log In</button>
      </form>
    </div>
  );
}

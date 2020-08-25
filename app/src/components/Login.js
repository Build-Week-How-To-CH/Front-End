import React, {useState} from "react";
import { NavLink, useHistory, Route } from "react-router-dom";
// import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios"
import { connect } from "react-redux";
import {setUserId} from "../store/actions"

const initialState = {
  username: "",
  password: "",
};

export const Login = (props) => {
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
        // console.log(res);
        // props.setUserId(res.data.user.id);
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
        <br></br>
        <div className="makeLink" onClick={() => history.push('/signup')}>Don't have an account? Click to sign up.</div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user_id:state.user_id,
  };
};

export default connect(mapStateToProps, {setUserId})(Login);

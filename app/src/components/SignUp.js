import React from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

  // Styling
  
  const StyledDiv = styled.div`
    background-color:	rgb(232, 232, 228);
    border-bottom:2px solid black;
  `

  const StyledLink = styled.div`
  margin-bottom:1%;
  margin-top:1%;
  `

  const StyledHeading = styled.h4`
  font-family:'Cherry Swash';
  `


function SignUp(props) {
  const { values, submit, inputChange, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onInputChange = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };

  const history = useHistory();

  // Event Listeners

  function changeColor (e){
    e.target.style.color = '#000099';
  }

  function changeColorBack (e){
    e.target.style.color = 'black';
  }




  return (
    <Route path="/signup">
      <StyledDiv>
          <NavLink to="/" onMouseOver={changeColor} onMouseOut={changeColorBack}>Home</NavLink>
          <form className="form container" onSubmit={onSubmit}>
            <div className="errors">
              <div>{errors.username}</div>
              <div>{errors.password}</div>
            </div>

            <div className="inputs">
              <StyledHeading><h4>Sign Up</h4></StyledHeading>

              <TextField
                  value={values.username}
                  onChange={onInputChange}
                  name="username"
                  type="text"
                  label='username'
              />

              <TextField
                  value={values.password}
                  onChange={onInputChange}
                  name= "password"
                  type="password"
                  label='password'
                />

              <Button variant="contained" color="primary" type="submit">Sign me up!</Button>
              <br></br>
              <StyledLink>
                <div className="makeLink" onClick={() => history.push("/")} onMouseOver = {changeColor} onMouseOut = {changeColorBack}>
                  Already have an account? Click to log in.
                </div>
              </StyledLink>
            </div>
          </form>
        </StyledDiv>
    </Route>
  );
}

export default SignUp;

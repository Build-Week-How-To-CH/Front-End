import  React from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';

function SignUp(props){

    return(
        <Route path ="/signup">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Log In</NavLink>
        </Route>
    )
}

export default SignUp
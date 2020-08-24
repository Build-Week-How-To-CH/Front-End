import React from 'react';
import { NavLink } from 'react-router-dom';

function Login () {

    return(
        <Route path='/login'>
            <NavLink to ='/'>Home</NavLink>
            <NavLink to = '/signup'>Sign Up</NavLink>
        </Route>
    )
}
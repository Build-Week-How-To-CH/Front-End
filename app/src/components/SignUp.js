import  React from 'react';
import {NavLink, Route, Switch, useHistory} from 'react-router-dom';

function SignUp(props){

    const {
        values,
        submit,
        inputChange,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onInputChange = evt => {
        const {name, value} = evt.target
        inputChange(name, value)
    }

    const history = useHistory()

    return(
        <Route path ="/signup">
            <NavLink to='/'>Home</NavLink>
            <form className = 'form container' onSubmit={onSubmit}>
                <div className='errors'>
                    <div>{errors.email}</div>
                    <div>{errors.username}</div>
                    <div>{errors.password}</div>
                </div>

                <div className = 'inputs'>

                    <h3>Sign Up</h3>

                    <label>Username:&nbsp;
                    <input
                        value={values.username}
                        onChange={onInputChange}
                        name='username'
                        type='text'
                        />
                    </label>

                    <label>Password:&nbsp;
                    <input
                        value={values.password}
                        onChange={onInputChange}
                        name='password'
                        type='password'
                        />
                    </label>

                    <button disabled={disabled}>Click to sign up</button> 
                </div>
            </form>
        </Route>
    )
}

export default SignUp
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LOGIN_START = 'LOGIN_START'
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'

export const fetchHowTos = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });

    axiosWithAuth()
      .get(`/api/howtos`)//need to add an endpoint
      .then((res) => {
        console.log(res);
        dispatch({ type: FETCH_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.log(err, 'teehee'));
  };
};

export const signUp = client => {
  return dispatch => {
    dispatch({type: LOGIN_START})
    axiosWithAuth()
    .post('/api/auth/register', client)//need an endpoint, might need 2, one for creator, one for user
    .then(res => {
      console.log(res)
      dispatch({type: FETCH_LOGIN_SUCCESS, payload: res.data})
      localStorage.setItem('token', res.token)
    })
    .catch(err => err)
  }
}



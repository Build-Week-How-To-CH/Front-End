import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LOGIN_START = 'LOGIN_START'
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'

export const fetchHowTos = (id) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });

    axiosWithAuth()
      .get(`${id}`)//need to add an endpoint
      .then((res) => {
        console.log(res);
        dispatch({ type: FETCH_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.log(err, 'teehee'));
  };
};

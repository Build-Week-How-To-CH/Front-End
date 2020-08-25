import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LOGIN_START = 'LOGIN_START'
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'

export const FETCH_HOWTOS_START = 'FETCH_HOWTOS_START'
export const FETCH_HOWTOS_SUCCESS = 'FETCH_HOWTOS_SUCCESS'
export const SET_USER_ID = 'SET_USER_ID'

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

export const signUp = client => {
  return dispatch => {
    dispatch({type: LOGIN_START})
    axiosWithAuth()
    .post('', client) //need an endpoint, might need 2, one for creator, one for user
    .then(res => {
      // console.log(res)
      dispatch({type: FETCH_LOGIN_SUCCESS, payload: res.data})
      localStorage.setItem('token', res.token)
    })
    .catch(err => err)
  }
}

export const fetchStudents = () => (dispatch) => {
  dispatch({
      type: FETCH_HOWTOS_START
    })
  axiosWithAuth()
    .get('/api/howtos')
    .then(res => {
      dispatch({ 
          type: FETCH_HOWTOS_SUCCESS, 
          payload: res.data.data
        })
      console.log(res);
    })
    .catch(err => console.log(err))
}

export const setUserId = (props) => (dispatch) => {
  dispatch({
    type: SET_USER_ID, payload:props.id
  })
}

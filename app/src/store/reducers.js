import { LOGIN_START, 
  FETCH_LOGIN_SUCCESS, 
  FETCH_HOWTOS_START,
  FETCH_HOWTOS_SUCCESS, } from "./actions";

const initialState = {
  howTos: [],
  isLoading: false,
  data: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
      case FETCH_HOWTOS_START:
        return {
          ...state,
          isLoading: true,
          error: ''
        }
      case FETCH_HOWTOS_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          howTos: action.payload,
          isLoading: false,
        }
        default:
        return state
  }

  

};
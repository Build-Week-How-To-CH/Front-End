import { LOGIN_START, FETCH_LOGIN_SUCCESS } from "./actions";

const initialState = {
  isLoading: false,
  data: "",
};

const reducer = (state = initialState, action) => {
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
  }
};

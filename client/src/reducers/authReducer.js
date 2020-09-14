import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_AUTH_ERRORS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: {
    userName: "",
  },
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        error: "",
      };
    case LOGIN_SUCCESS:
    case REGISER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: "",
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: { userName: "" },
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: { userName: "" },
        isAuthenticated: false,
        isLoading: false,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

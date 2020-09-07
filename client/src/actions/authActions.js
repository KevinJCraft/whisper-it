import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISER_SUCCESS,
} from "./types";

axios.defaults.baseURL = "http://localhost:3000/";

//check token and load user
export const loadUser = (dispatch) => {
  //User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("api/auth/user", tokenConfig())
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const register = (dispatch, { userName, password }) => {
  const body = JSON.stringify({ userName, password });
  axios
    .post("api/users", body, tokenConfig())
    .then((res) => {
      dispatch({
        type: REGISER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });
      returnErrors(
        dispatch,
        err.response.data,
        err.response.status,
        "REGISTER_FAIL"
      );
    });
};

export const logOut = (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

export const login = (dispatch, { userName, password }) => {
  const body = JSON.stringify({ userName, password });
  axios
    .post("api/auth", body, tokenConfig())
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
      returnErrors(
        dispatch,
        err.response.data,
        err.response.status,
        "LOGIN_FAIL"
      );
    });
};

export const tokenConfig = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

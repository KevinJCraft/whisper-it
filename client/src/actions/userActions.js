import { GET_ERRORS, GET_USER_PROFILE } from "./types";
import axios from "axios";

export const getUserProfile = (dispatch, { name, sort }) => {
  axios
    .get(`/api/users/profile/${sort}/${name}`)
    .then((res) => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: {
          msg: err.response.data.msg,
          status: err.response.status,
          id: "GET_USER_PROFILE_FAIL",
        },
      });
    });
};

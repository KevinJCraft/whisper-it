import { GET_USER_PROFILE } from "./types";
import axios from "axios";

export const getUserProfile = (dispatch, profileName) => {
  axios.get(`/api/users/profile/${profileName}`).then((res) => {
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  });
};

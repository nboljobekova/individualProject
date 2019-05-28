import axios from "axios";

export const USERS_START = "USERS_START";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_FAIL = "USERS_FAIL";

export const getUsers = () => {
  return (dispatch) => {
    dispatch(usersStart());
    axios.get("/xxx")
      .then(response => {
        dispatch(usersSuccess(
          response.data
        ))
      })
      .catch(error => {
        dispatch(usersFail(
          error
        ))
      })
  }
}

const usersStart = () => {
  return {
    type: USERS_START
  }
}

const usersSuccess = (users) => {
  return {
    type: USERS_SUCCESS,
    payload: users
  }
}

const usersFail = (error) => {
  return {
    type: USERS_FAIL,
    payload: error
  }
}
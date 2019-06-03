import axios from "../axios";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";
export const ADD_USERS_SUCCESS = "ADD_USERS_SUCCESS";
export const ADD_USERS_FAIL = "ADD_USERS_FAIL";
export const SAVE_USERS_SUCCESS = "SAVE_USERS_SUCCESS";
export const SAVE_USERS_FAIL = "SAVE_USERS_FAIL";
export const DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS";
export const DELETE_USERS_FAIL = "DELETE_USERS_FAIL";

const getUsersStart = () => ({type: GET_USERS_START});

export const getUsers = () => {
  console.log("hsd")
  return (dispatch) => {
    dispatch (getUsersStart)
    axios.get("http://localhost:3000/users")
      .then((response) => {
        console.log(response)
        dispatch({ type: GET_USERS_SUCCESS, users: response.data })
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: GET_USERS_FAIL, payload: error })
      })
  }
} 

export const addUsers = (payload) => {
  return (dispatch) => {
    axios.post("/users", payload)
      .then((response) => {
        payload.id = response.data.id;
        dispatch({type: ADD_USERS_SUCCESS, payload: payload})//the new item is returned with an ID
      })
      .catch((error) => {
        dispatch({type: ADD_USERS_FAIL, payload: error})
      })
  }
}

export const saveUsers = (payload) => {
  console.log(payload)
  return (dispatch) => {
    axios.put("/users"+payload.id, payload.data)
      .then(() => {
        dispatch({type: SAVE_USERS_SUCCESS })

        axios.get("/users")
          .then((response) => {
            dispatch({type: GET_USERS_SUCCESS, payload: response.data})
          })
          .catch((error) => {
            dispatch({type: GET_USERS_FAIL, payload: error})
          })
      })
      .catch((error) => {
        dispatch({type: SAVE_USERS_FAIL, payload: error})
      })
  }
}

export const deleteUsers = (payload) => {
  console.log(payload)
  return (dispatch) => {
    axios.delete("/users"+payload)
      .then((response) => {
        console.log(response)

        dispatch({type: DELETE_USERS_SUCCESS, payload: payload })

        /*axios.get("/users")
          .then((response) => {
            dispatch({type: GET_USERS_SUCCESS, payload: response.data })
          })
          .catch((error) => {
            dispatch({type: GET_USERS_FAIL, payload: error})
          })*/
      })
      .catch((error) => {
        dispatch({type: DELETE_USERS_FAIL, payload: error})
      })
  }
}
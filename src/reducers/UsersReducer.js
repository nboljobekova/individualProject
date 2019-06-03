import {
  GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAIL
  } from "../actions/UsersActions"
  
  export const UsersReducer = (state = {
    status: null,
    error: null,
    objects: []
  }, action) => {
    switch(action.type){
      case GET_USERS_START:
        return {
          ...state,
          status: "loading"
        }
      case GET_USERS_SUCCESS:
        return {
          ...state,
          status: "success",
          objects: action.payload
        }
      case GET_USERS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  // export default UsersReducer;
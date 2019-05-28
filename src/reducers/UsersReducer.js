import {
    USERS_START, USERS_SUCCESS, USERS_FAIL
  } from "../actions/UsersActions"
  
  const UsersReducer = (state = {
    status: null,
    error: null,
    objects: []
  }, action) => {
    switch(action.type){
      case USERS_START:
        return {
          ...state,
          status: "loading"
        }
      case USERS_SUCCESS:
        return {
          ...state,
          status: "success",
          objects: action.payload
        }
      case USERS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  export default UsersReducer;
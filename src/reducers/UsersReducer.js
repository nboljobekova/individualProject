import {
  GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAIL, ADD_USERS_SUCCESS, SAVE_USERS_SUCCESS, DELETE_USERS_SUCCESS, 
  // ADD_USERS_FAIL, SAVE_USERS_FAIL, DELETE_USERS_FAIL
  } from "../actions/UsersActions"
  
  export const UsersReducer = (state = {
    users: [],
    status: null,
    error: null,
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
          users: action.payload
        }
      case GET_USERS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      case ADD_USERS_SUCCESS: 
      return {
        ...state,
        users: [...state.users, action.payload],
      }
      
      case SAVE_USERS_SUCCESS: 
        return state
      
      case DELETE_USERS_SUCCESS: 
        // console.log(action.payload)
        // console.log(state.users)
        let index = state.users.findIndex((x) => x.id === action.payload); 
        // console.log("index", index)
        state.users.splice(index, 1)
        // console.log("spliced", state.users)
        return {
          users: state.users
          //state.medSystems.slice(index + 1),
        } 

      default:
        return state
    }
  }
  
  // export default UsersReducer;
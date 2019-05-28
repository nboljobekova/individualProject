import {
    PS_SYSTEMS_START, PS_SYSTEMS_SUCCESS, PS_SYSTEMS_FAIL
  } from "../actions/PsSystemsActions"
  
  const PsSystemsReducer = (state = {
    status: null,
    error: null,
    objects: []
  }, action) => {
    switch(action.type){
      case PS_SYSTEMS_START:
        return {
          ...state,
          status: "loading"
        }
      case PS_SYSTEMS_SUCCESS:
        return {
          ...state,
          status: "success",
          objects: action.payload
        }
      case PS_SYSTEMS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  export default PsSystemsReducer;
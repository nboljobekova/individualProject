import {
    PS_SCALES_START, PS_SCALES_SUCCESS, PS_SCALES_FAIL
  } from "../actions/PsScalesActions"
  
  export const PsScalesReducer = (state = {
    status: null,
    error: null,
    PsScales: []
  }, action) => {
    switch(action.type){
      case PS_SCALES_START:
        return {
          ...state,
          status: "loading"
        }
      case PS_SCALES_SUCCESS:
        return {
          ...state,
          status: "success",
          PsScales: action.payload
        }
      case PS_SCALES_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  // export default PsSystemsReducer;
import {
  GET_PSQUESTIONS_START, GET_PSQUESTIONS_SUCCESS, GET_PSQUESTIONS_FAIL
  } from "../actions/PsQuestionsActions"
  
  export const PsQuestionsReducer = (state = {
    status: null,
    error: null,
    objects: []
  }, action) => {
    switch(action.type){
      case GET_PSQUESTIONS_START:
        return {
          ...state,
          status: "loading"
        }
      case GET_PSQUESTIONS_SUCCESS:
        return {
          ...state,
          status: "success",
          objects: action.payload
        }
      case GET_PSQUESTIONS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  // export default PsQuestionsReducer;
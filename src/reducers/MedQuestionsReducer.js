import {
    GET_MEDQUESTIONS_START, GET_MEDQUESTIONS_SUCCESS, GET_MEDQUESTIONS_FAIL
  } from "../actions/MedQuestionsActions"
  
  export const MedQuestionsReducer = (state = {
    medQuestions: [],
    status: null,
    error: null,
  }, action) => {
    switch(action.type){
      case GET_MEDQUESTIONS_START:
        return {
          ...state,
          status: "loading"
        }
      case GET_MEDQUESTIONS_SUCCESS:
        return {
          ...state,
          status: "success",
          medQuestions: action.payload
        }
      case GET_MEDQUESTIONS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  // export default MedQuestionsReducer;
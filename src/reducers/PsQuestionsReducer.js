import {
    PS_QUESTIONS_START, PS_QUESTIONS_SUCCESS, PS_QUESTIONS_FAIL
  } from "../actions/PsQuestionsActions"
  
  const PsQuestionsReducer = (state = {
    status: null,
    error: null,
    objects: []
  }, action) => {
    switch(action.type){
      case PS_QUESTIONS_START:
        return {
          ...state,
          status: "loading"
        }
      case PS_QUESTIONS_SUCCESS:
        return {
          ...state,
          status: "success",
          objects: action.payload
        }
      case PS_QUESTIONS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  export default PsQuestionsReducer;
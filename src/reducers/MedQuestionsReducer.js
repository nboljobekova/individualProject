import {
    MED_QUESTIONS_START, MED_QUESTIONS_SUCCESS, MED_QUESTIONS_FAIL
  } from "../actions/MedQuestionsActions"
  
  const MedQuestionsReducer = (state = {
    status: null,
    error: null,
    objects: []
  }, action) => {
    switch(action.type){
      case MED_QUESTIONS_START:
        return {
          ...state,
          status: "loading"
        }
      case MED_QUESTIONS_SUCCESS:
        return {
          ...state,
          status: "success",
          objects: action.payload
        }
      case MED_QUESTIONS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  export default MedQuestionsReducer;
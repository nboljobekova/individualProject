import {
  GET_PSQUESTIONS_START, GET_PSQUESTIONS_SUCCESS, GET_PSQUESTIONS_FAIL, ADD_PSQUESTIONS_SUCCESS, SAVE_PSQUESTIONS_SUCCESS, DELETE_PSQUESTIONS_SUCCESS,     
  } from "../actions/PsQuestionsActions"
  
  export const PsQuestionsReducer = (state = {
    psQuestions: [],
    status: null,
    error: null,
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
          psQuestions: action.payload
        }
      case GET_PSQUESTIONS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
        case ADD_PSQUESTIONS_SUCCESS: 
        return {
          ...state,
          psQuestions: [...state.psQuestions, action.payload],
        }
        
        case SAVE_PSQUESTIONS_SUCCESS: 
          return state
        
        case DELETE_PSQUESTIONS_SUCCESS: 
          console.log(action.payload)
          console.log(state.psQuestions)
          let index = state.psQuestions.findIndex((x) => x.id === action.payload); 
          console.log("index", index)
          state.psQuestions.splice(index, 1)
          console.log("spliced", state.psQuestions)
          return {
            psQuestions: state.medQuestions
            //state.psSystems.slice(index + 1),
          } 

      default:
        return state
    }
  }
  
  // export default PsQuestionsReducer;
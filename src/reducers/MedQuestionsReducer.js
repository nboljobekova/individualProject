import {
  GET_MEDQUESTIONS_START,
  GET_MEDQUESTIONS_SUCCESS,
  GET_MEDQUESTIONS_FAIL,
  ADD_MEDQUESTIONS_SUCCESS,
  SAVE_MEDQUESTIONS_SUCCESS,
  DELETE_MEDQUESTIONS_SUCCESS,
  TEST_MEDQUESTIONS_SUCCESS
} from "../actions/MedQuestionsActions";

export const MedQuestionsReducer = (
  state = {
    medQuestions: [],
    test: [],
    status: null,
    error: null
  },
  action
) => {
  switch (action.type) {
    case GET_MEDQUESTIONS_START:
      return {
        ...state,
        status: "loading"
      };
    case GET_MEDQUESTIONS_SUCCESS:
      return {
        ...state,
        status: "success",
        medQuestions: action.payload
      };
    case GET_MEDQUESTIONS_FAIL:
      return {
        ...state,
        status: "error",
        error: action.payload
      };
    case ADD_MEDQUESTIONS_SUCCESS:
      return {
        ...state,
        medQuestions: [...state.medQuestions, action.payload]
      };

    case SAVE_MEDQUESTIONS_SUCCESS:
      return state;

    case DELETE_MEDQUESTIONS_SUCCESS:
      // console.log(action.payload)
      // console.log(state.medQuestions)
      let index = state.medQuestions.findIndex(x => x.id === action.payload);
      // console.log("index", index)
      state.medQuestions.splice(index, 1);
      // console.log("spliced", state.medQuestions)
      return {
        medQuestions: state.medQuestions
        //state.medSystems.slice(index + 1),
      };


    case TEST_MEDQUESTIONS_SUCCESS:
      return {
        ...state,
        test: [...state.test, action.payload]
      };
        


    default:
      return state;
  }
};
import MedQuestionsReducer, { state } from "../reducers/MedQuestionsReducer";
import {
  GET_MEDQUESTIONS_START,
  GET_MEDQUESTIONS_SUCCESS,
  GET_MEDQUESTIONS_FAIL,
  ADD_MEDQUESTIONS_SUCCESS,
  SAVE_MEDQUESTIONS_SUCCESS,
  DELETE_MEDQUESTIONS_SUCCESS
} from "../actions/MedQuestionsActions";

describe('MedQuestionsReducer', () => {
  it('GET_MEDQUESTIONS_START', () => {

    const action = {
      type: GET_MEDQUESTIONS_START
    };

    expect(MedQuestionsReducer(state, action)).toEqual({
      ...state,
      medQuestions: undefined,
      test: undefined,
      status: "loading",
      error: null
    });
  });

  it('GET_MEDQUESTIONS_SUCCESS', () => {

    const action = {
      type: GET_MEDQUESTIONS_SUCCESS,
      medQuestions: action.payload
    };

    expect(MedQuestionsReducer(state, action)).toEqual({
      ...state,
      status: "success",
      medQuestions: action.payload
    });

  });
});

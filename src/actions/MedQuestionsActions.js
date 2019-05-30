import axios from "../../axios";

export const MED_QUESTIONS_START = "MED_QUESTIONS_START";
export const MED_QUESTIONS_SUCCESS = "MED_QUESTIONS_SUCCESS";
export const MED_QUESTIONS_FAIL = "MED_QUESTIONS_FAIL";

export const getMedQuestions = () => {
  return (dispatch) => {
    dispatch(medQuestionsStart());
    axios.get("/questions")
      .then(response => {
        dispatch(medQuestionsSuccess(
          response.data
        ))
      })
      .catch(error => {
        dispatch(medQuestionsFail(
          error
        ))
      })
  }
}

const medQuestionsStart = () => {
  return {
    type: MED_QUESTIONS_START
  }
}

const medQuestionsSuccess = (medQuestions) => {
  return {
    type: MED_QUESTIONS_SUCCESS,
    payload: medQuestions
  }
}

const medQuestionsFail = (error) => {
  return {
    type: MED_QUESTIONS_FAIL,
    payload: error
  }
}
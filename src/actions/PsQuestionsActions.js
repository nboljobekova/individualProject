import axios from "axios";

export const PS_QUESTIONS_START = "PS_QUESTIONS_START";
export const PS_QUESTIONS_SUCCESS = "PS_QUESTIONS_SUCCESS";
export const PS_QUESTIONS_FAIL = "PS_QUESTIONS_FAIL";

export const getPsQuestions = () => {
  return (dispatch) => {
    dispatch(psQuestionsStart());
    axios.get("/xxx")
      .then(response => {
        dispatch(psQuestionsSuccess(
          response.data
        ))
      })
      .catch(error => {
        dispatch(psQuestionsFail(
          error
        ))
      })
  }
}

const psQuestionsStart = () => {
  return {
    type: PS_QUESTIONS_START
  }
}

const psQuestionsSuccess = (psQuestions) => {
  return {
    type: PS_QUESTIONS_SUCCESS,
    payload: psQuestions
  }
}

const psQuestionsFail = (error) => {
  return {
    type: PS_QUESTIONS_FAIL,
    payload: error
  }
}
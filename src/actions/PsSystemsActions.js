import axios from "../axios";

export const PS_SYSTEMS_START = "PS_SYSTEMS_START";
export const PS_SYSTEMS_SUCCESS = "PS_SYSTEMS_SUCCESS";
export const PS_SYSTEMS_FAIL = "PS_SYSTEMS_FAIL";

export const getPsSystems = () => {
  return (dispatch) => {
    dispatch(psSystemsStart());
    axios.get("/xxx")
      .then(response => {
        dispatch(psSystemsSuccess(
          response.data
        ))
      })
      .catch(error => {
        dispatch(psSystemsFail(
          error
        ))
      })
  }
}

const psSystemsStart = () => {
  return {
    type: PS_SYSTEMS_START
  }
}

const psSystemsSuccess = (psSystems) => {
  return {
    type: PS_SYSTEMS_SUCCESS,
    payload: psSystems
  }
}

const psSystemsFail = (error) => {
  return {
    type: PS_SYSTEMS_FAIL,
    payload: error
  }
}
import axios from "../axios";

export const PS_SCALES_START = "PS_SCALES_START";
export const PS_SCALES_SUCCESS = "PS_SCALES_SUCCESS";
export const PS_SCALES_FAIL = "PS_SCALES_FAIL";

export const getPsScales = () => {
  return (dispatch) => {
    dispatch(psScalesStart());
    axios.get("/xxx")
      .then(response => {
        dispatch(psScalesSuccess(
          response.data
        ))
      })
      .catch(error => {
        dispatch(psScalesFail(
          error
        ))
      })
  }
}

const psScalesStart = () => {
  return {
    type: PS_SCALES_START
  }
}

const psScalesSuccess = (psScales) => {
  return {
    type: PS_SCALES_SUCCESS,
    payload: psScales
  }
}

const psScalesFail = (error) => {
  return {
    type: PS_SCALES_FAIL,
    payload: error
  }
}
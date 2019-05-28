import axios from "axios";

export const MED_SYSTEMS_START = "MED_SYSTEMS_START";
export const MED_SYSTEMS_SUCCESS = "MED_SYSTEMS_SUCCESS";
export const MED_SYSTEMS_FAIL = "MED_SYSTEMS_FAIL";

export const getMedSystems = () => {
  return (dispatch) => {
    dispatch(medSystemsStart());
    axios.get("/xxx")
      .then(response => {
        dispatch(medSystemsSuccess(
          response.data
        ))
      })
      .catch(error => {
        dispatch(medSystemsFail(
          error
        ))
      })
  }
}

const medSystemsStart = () => {
  return {
    type: MED_SYSTEMS_START
  }
}

const medSystemsSuccess = (medSystems) => {
  return {
    type: MED_SYSTEMS_SUCCESS,
    payload: medSystems
  }
}

const medSystemsFail = (error) => {
  return {
    type: MED_SYSTEMS_FAIL,
    payload: error
  }
}
import axios from "../axios";

export const GET_MEDQUESTIONS_START = "GET_MEDQUESTIONS_START";
export const GET_MEDQUESTIONS_SUCCESS = "GET_MEDQUESTIONS_SUCCESS";
export const GET_MEDQUESTIONS_FAIL = "GET_MEDQUESTIONS_FAIL";
export const ADD_MEDQUESTIONS_SUCCESS = "ADD_MEDQUESTIONS_SUCCESS";
export const ADD_MEDQUESTIONS_FAIL = "ADD_MEDQUESTIONS_FAIL";
export const SAVE_MEDQUESTIONS_SUCCESS = "SAVE_MEDQUESTIONS_SUCCESS";
export const SAVE_MEDQUESTIONS_FAIL = "SAVE_MEDQUESTIONS_FAIL";
export const DELETE_MEDQUESTIONS_SUCCESS = "DELETE_MEDQUESTIONS_SUCCESS";
export const DELETE_MEDQUESTIONS_FAIL = "DELETE_MEDQUESTIONS_FAIL";

const getMedQuestionsStart = () => ({type: GET_MEDQUESTIONS_START});

export const getMedQuestions = () => {
  return (dispatch) => {
    dispatch (getMedQuestionsStart)
    axios.get("http://localhost:3000/medQuestions")
      .then((response) => {
        console.log(response)
        dispatch({ type: GET_MEDQUESTIONS_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: GET_MEDQUESTIONS_FAIL, payload: error })
      })
  }
} 

export const addMedQuestions = (payload) => {
  return (dispatch) => {
    return axios.post("http://localhost:3000/medQuestions/", payload)
      .then((response) => {
        payload.id = response.data.id;
        dispatch({type: ADD_MEDQUESTIONS_SUCCESS, payload: payload})//the new item is returned with an ID
      })
      .catch((error) => {
        dispatch({type: ADD_MEDQUESTIONS_FAIL, payload: error})
      })
  }
}

export const saveMedQuestions = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.put("http://localhost:3000/medQuestions/" + payload.id, payload.data)
      .then(() => {
        dispatch({type: SAVE_MEDQUESTIONS_SUCCESS })

        return axios.get("http://localhost:3000/medQuestions")
          .then((response) => {
            dispatch({type: GET_MEDQUESTIONS_SUCCESS, payload: response.data})
          })
          .catch((error) => {
            dispatch({type: GET_MEDQUESTIONS_FAIL, payload: error})
          })
      })
      .catch((error) => {
        dispatch({type: SAVE_MEDQUESTIONS_FAIL, payload: error})
      })
  }
}

export const deleteMedQuestions = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.delete("http://localhost:3000/medQuestions/" + payload)
      .then((response) => {
        console.log(response)

        dispatch({type: DELETE_MEDQUESTIONS_SUCCESS, payload: payload })

        /*axios.get("/medQuestions")
          .then((response) => {
            dispatch({type: GET_MEDQUESTIONS_SUCCESS, payload: response.data })
          })
          .catch((error) => {
            dispatch({type: GET_MEDQUESTIONS_FAIL, payload: error})
          })*/
      })
      .catch((error) => {
        dispatch({type: DELETE_MEDQUESTIONS_FAIL, payload: error})
      })
  }
}
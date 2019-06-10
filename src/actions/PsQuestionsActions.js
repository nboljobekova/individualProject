import axios from "../axios";

export const GET_PSQUESTIONS_START = "GET_PSQUESTIONS_START";
export const GET_PSQUESTIONS_SUCCESS = "GET_PSQUESTIONS_SUCCESS";
export const GET_PSQUESTIONS_FAIL = "GET_PSQUESTIONS_FAIL";
export const ADD_PSQUESTIONS_SUCCESS = "ADD_PSQUESTIONS_SUCCESS";
export const ADD_PSQUESTIONS_FAIL = "ADD_PSQUESTIONS_FAIL";
export const SAVE_PSQUESTIONS_SUCCESS = "SAVE_PSQUESTIONS_SUCCESS";
export const SAVE_PSQUESTIONS_FAIL = "SAVE_PSQUESTIONS_FAIL";
export const DELETE_PSQUESTIONS_SUCCESS = "DELETE_PSQUESTIONS_SUCCESS";
export const DELETE_PSQUESTIONS_FAIL = "DELETE_PSQUESTIONS_FAIL";

const getPsQuestionsStart = () => ({type: GET_PSQUESTIONS_START});

export const getPsQuestions = () => {
  console.log("hsd")
  return (dispatch) => {
    dispatch (getPsQuestionsStart)
    axios.get("http://localhost:3000/psQuestions")
      .then((response) => {
        console.log(response)
        dispatch({ type: GET_PSQUESTIONS_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: GET_PSQUESTIONS_FAIL, payload: error })
      })
  }
} 

export const addPsQuestions = (payload) => {
  return (dispatch) => {
    return axios.post("http://localhost:3000/psQuestions/", payload)
      .then((response) => {
        payload.id = response.data.id;
        dispatch({type: ADD_PSQUESTIONS_SUCCESS, payload: payload})//the new item is returned with an ID
        return true
      })
      .catch((error) => {
        dispatch({type: ADD_PSQUESTIONS_FAIL, payload: error})
        return false
      })
  }
}

export const savePsQuestions = (payload) => {
  console.log(payload)
  return (dispatch) => {
    axios.put("http://localhost:3000/psQuestions/"+payload.id, payload.data)
      .then(() => {
        dispatch({type: SAVE_PSQUESTIONS_SUCCESS })

        return axios.get("http://localhost:3000/psQuestions")
          .then((response) => {
            dispatch({type: GET_PSQUESTIONS_SUCCESS, payload: response.data})
          })
          .catch((error) => {
            dispatch({type: GET_PSQUESTIONS_FAIL, payload: error})
          })
      })
      .catch((error) => {
        dispatch({type: SAVE_PSQUESTIONS_FAIL, payload: error})
      })
  }
}

export const deletePsQuestions = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.delete("http://localhost:3000/psQuestions/" + payload)
      .then((response) => {
        console.log(response)

        dispatch({type: DELETE_PSQUESTIONS_SUCCESS, payload: payload })

        /*axios.get("/psQuestions")
          .then((response) => {
            dispatch({type: GET_PSQUESTIONS_SUCCESS, payload: response.data })
          })
          .catch((error) => {
            dispatch({type: GET_PSQUESTIONS_FAIL, payload: error})
          })*/
      })
      .catch((error) => {
        dispatch({type: DELETE_PSQUESTIONS_FAIL, payload: error})
      })
  }
}
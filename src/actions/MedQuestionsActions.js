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
export const TEST_MEDQUESTIONS_SUCCESS = "TEST_MEDQUESTIONS_SUCCESS";
export const TEST_MEDQUESTIONS_FAIL = "TEST_MEDQUESTIONS_FAIL";
export const GENERATE_ANSWERS_SUCCESS = "GENERATE_ANSWERS_SUCCESS";
export const GENERATE_ANSWERS_FAIL = "GENERATE_ANSWERS_FAIL";

const getMedQuestionsStart = () => ({type: GET_MEDQUESTIONS_START});

export const getMedQuestions = () => {
  return (dispatch) => {
    dispatch (getMedQuestionsStart)
    axios.get("http://localhost:3000/medQuestions")
      .then((response) => {
        // console.log(response)
        dispatch({ type: GET_MEDQUESTIONS_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        // console.log(error)
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
        return true
      })
      .catch((error) => {
        dispatch({type: ADD_MEDQUESTIONS_FAIL, payload: error})
        return false
      })
  }
}

export const deleteMedQuestions = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.delete("http://localhost:3000/medQuestions/" + payload)
      .then((response) => {
        // console.log(response)
        dispatch({type: DELETE_MEDQUESTIONS_SUCCESS, payload: payload })
      })
      .catch((error) => {
        dispatch({type: DELETE_MEDQUESTIONS_FAIL, payload: error})
      })
  }
}

export const saveMedQuestions = (payload) => {
  // console.log(payload)
  return (dispatch) => {
    return axios.put("http://localhost:3000/medQuestions/" + payload.id, payload.data)
      .then(() => {
        dispatch({type: SAVE_MEDQUESTIONS_SUCCESS })
        return axios.get("http://localhost:3000/medQuestions")
          .then((response) => {
            dispatch({type: GET_MEDQUESTIONS_SUCCESS, payload: response.data})
            return true
          })
          .catch((error) => {
            dispatch({type: GET_MEDQUESTIONS_FAIL, payload: error})
            return false
          })
      })
      .catch((error) => {
        dispatch({type: SAVE_MEDQUESTIONS_FAIL, payload: error})
      })
  }
}

// export const addMedQuestions = (payload) => {
//   return (dispatch) => {
//     return axios.post("http://localhost:3000/medQuestions/", payload)
//       .then((response) => {
//         payload.id = response.data.id;
//         dispatch({type: ADD_MEDQUESTIONS_SUCCESS, payload: payload})//the new item is returned with an ID
//         return true
//       })
//       .catch((error) => {
//         dispatch({type: ADD_MEDQUESTIONS_FAIL, payload: error})
//         return false
//       })
//   }
// }

export const testMedQuestions = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.post("http://localhost:3000/test/", payload)
      .then((response) => {
        // payload.id = response.data.id;
        dispatch({type: TEST_MEDQUESTIONS_SUCCESS, payload: response.data})//the new item is returned with an ID
        return true
      })
      .catch((error) => {
        dispatch({type: TEST_MEDQUESTIONS_FAIL, payload: error})
        return false
      })
  }
}


// export const generateAnswers = (payload) => {
//    const f = (dispatch, getState) => {
//     const questions = getState().questions;
//     if (!questions.length){
//       setTimeout(f, 150, dispatch, getState)
//       return
//     }
//     console.log("OK")
//     return axios.put("http://localhost:3000/medQuestions/", payload.data)
//       .then((response) => {
//         dispatch({type: GENERATE_ANSWERS_SUCCESS, payload: response.data})//the new item is returned with an ID
//         return true
//       })
//       .catch((error) => {
//         dispatch({type: GENERATE_ANSWERS_FAIL, payload: error})
//         return false
//       })

//   }
//   return f
// }
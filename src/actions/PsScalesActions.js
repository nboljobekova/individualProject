import axios from "../axios";

export const GET_PSSCALES_START = "GET_PSSCALES_START";
export const GET_PSSCALES_SUCCESS = "GET_PSSCALES_SUCCESS";
export const GET_PSSCALES_FAIL = "GET_PSSCALES_FAIL";
export const ADD_PSSCALES_SUCCESS = "ADD_MEDSYSTEM_SUCCESS";
export const ADD_PSSCALES_FAIL = "ADD_MEDSYSTEM_FAIL";
export const SAVE_PSSCALES_SUCCESS = "SAVE_MEDSYSTEM_SUCCESS";
export const SAVE_PSSCALES_FAIL = "SAVE_MEDSYSTEM_FAIL";
export const DELETE_PSSCALES_SUCCESS = "DELETE_MEDSYSTEM_SUCCESS";
export const DELETE_PSSCALES_FAIL = "DELETE_MEDSYSTEM_FAIL";


const getPsScalesStart = () => ({type: GET_PSSCALES_START});

export const getPsScales = () => {
  return (dispatch) => {
    dispatch (getPsScalesStart)
    axios.get("http://localhost:3000/psScales")
      .then((response) => {
        console.log(response)
        dispatch({ type: GET_PSSCALES_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: GET_PSSCALES_FAIL, payload: error })
      })
  }
} 

export const addPsScales = (payload) => {
  return (dispatch) => {
    return axios.post("http://localhost:3000/psScales", payload)
      .then((response) => {
        payload.id = response.data.id;
        dispatch({type: ADD_PSSCALES_SUCCESS, payload: payload})//the new item is returned with an ID
      })
      .catch((error) => {
        dispatch({type: ADD_PSSCALES_FAIL, payload: error})
      })
  }
}

export const savePsScales = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.put("http://localhost:3000/psScales"+payload.id, payload.data)
      .then(() => {
        dispatch({type: SAVE_PSSCALES_SUCCESS })

        axios.get("http://localhost:3000/psScales")
          .then((response) => {
            dispatch({type: GET_PSSCALES_SUCCESS, payload: response.data})
          })
          .catch((error) => {
            dispatch({type: GET_PSSCALES_FAIL, payload: error})
          })
      })
      .catch((error) => {
        dispatch({type: SAVE_PSSCALES_FAIL, payload: error})
      })
  }
}

export const deletePsScales = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.delete("http://localhost:3000/psScales/" + payload)
      .then((response) => {
        console.log(response)

        dispatch({type: DELETE_PSSCALES_SUCCESS, payload: payload })

        /*axios.get("http://localhost:3000/medSystems")
          .then((response) => {
            dispatch({type: GET_PSSCALES_SUCCESS, payload: response.data })
          })
          .catch((error) => {
            dispatch({type: GET_PSSCALES_FAIL, payload: error})
          })*/
      })
      .catch((error) => {
        dispatch({type: DELETE_PSSCALES_FAIL, payload: error})
      })
  }
}
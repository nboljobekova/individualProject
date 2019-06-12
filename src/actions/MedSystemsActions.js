import axios from "../axios";

export const GET_MEDSYSTEMS_START = "GET_MEDSYSTEMS_START";
export const GET_MEDSYSTEMS_SUCCESS = "GET_MEDSYSTEMS_SUCCESS";
export const GET_MEDSYSTEMS_FAIL = "GET_MEDSYSTEMS_FAIL";
export const ADD_MEDSYSTEM_SUCCESS = "ADD_MEDSYSTEM_SUCCESS";
export const ADD_MEDSYSTEM_FAIL = "ADD_MEDSYSTEM_FAIL";
export const SAVE_MEDSYSTEM_SUCCESS = "SAVE_MEDSYSTEM_SUCCESS";
export const SAVE_MEDSYSTEM_FAIL = "SAVE_MEDSYSTEM_FAIL";
export const DELETE_MEDSYSTEM_SUCCESS = "DELETE_MEDSYSTEM_SUCCESS";
export const DELETE_MEDSYSTEM_FAIL = "DELETE_MEDSYSTEM_FAIL";

const getMedSystemsStart = () => ({type: GET_MEDSYSTEMS_START});

export const getMedSystems = () => {
  return (dispatch) => {
    dispatch (getMedSystemsStart)
    axios.get("http://localhost:3000/medSystems")
      .then((response) => {
        console.log('--->', response.data)
        // console.log(response)
        dispatch({ type: GET_MEDSYSTEMS_SUCCESS, payload: response.data })
      })
      .catch((error) => {
        // console.log(error)
        dispatch({ type: GET_MEDSYSTEMS_FAIL, payload: error })
      })
  }
}  

export const addMedSystem = (payload) => {
  return (dispatch) => {
    return axios.post("http://localhost:3000/medSystems/", payload)
      .then((response) => {
        payload.id = response.data.id;
        dispatch({type: ADD_MEDSYSTEM_SUCCESS, payload: payload})//the new item is returned with an ID
        return true
      })
      .catch((error) => {
        dispatch({type: ADD_MEDSYSTEM_FAIL, payload: error})
        return false
      })
  }
}

export const saveMedSystem = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.put("http://localhost:3000/medSystems/"+payload.id, payload.data)
      .then(() => {
        dispatch({type: SAVE_MEDSYSTEM_SUCCESS })

        axios.get("http://localhost:3000/medSystems")
          .then((response) => {
            dispatch({type: GET_MEDSYSTEMS_SUCCESS, payload: response.data})
          })
          .catch((error) => {
            dispatch({type: GET_MEDSYSTEMS_FAIL, payload: error})
          })
      })
      .catch((error) => {
        dispatch({type: SAVE_MEDSYSTEM_FAIL, payload: error})
      })
  }
}

export const deleteMedSystem = (payload) => {
  console.log(payload)
  return (dispatch) => {
    return axios.delete("http://localhost:3000/medSystems/" + payload)
      .then((response) => {
        console.log(response)

        dispatch({type: DELETE_MEDSYSTEM_SUCCESS, payload: payload })

        /*axios.get("http://localhost:3000/medSystems")
          .then((response) => {
            dispatch({type: GET_MEDSYSTEMS_SUCCESS, payload: response.data })
          })
          .catch((error) => {
            dispatch({type: GET_MEDSYSTEMS_FAIL, payload: error})
          })*/
      })
      .catch((error) => {
        dispatch({type: DELETE_MEDSYSTEM_FAIL, payload: error})
      })
  }
}
import {
    MED_SYSTEMS_START, MED_SYSTEMS_SUCCESS, MED_SYSTEMS_FAIL
  } from "../actions/MedSystemsActions"
  
  const MedSystemsReducer = (state = {
    status: null,
    error: null,
    objects: []
  }, action) => {
    switch(action.type){
      case MED_SYSTEMS_START:
        return {
          ...state,
          status: "loading"
        }
      case MED_SYSTEMS_SUCCESS:
        return {
          ...state,
          status: "success",
          objects: action.payload
        }
      case MED_SYSTEMS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }
      default:
        return state
    }
  }
  
  export default MedSystemsReducer;
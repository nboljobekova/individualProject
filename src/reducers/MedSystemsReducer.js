import {
  GET_MEDSYSTEMS_START, GET_MEDSYSTEMS_SUCCESS, GET_MEDSYSTEMS_FAIL, ADD_MEDSYSTEM_SUCCESS, SAVE_MEDSYSTEM_SUCCESS, DELETE_MEDSYSTEM_SUCCESS
  } from "../actions/MedSystemsActions"
  
  
export const MedSystemsReducer = (state = {
    medSystems: [],
    status: null,
    error: null,
  }, action) => {
    // console.log("action: ", action)
    switch(action.type){
      case GET_MEDSYSTEMS_START:
        return {
          ...state,
          status: "loading"
        }
      case GET_MEDSYSTEMS_SUCCESS:
        return {
          ...state,
          status: "success",
          medSystems: action.payload
        }
      case GET_MEDSYSTEMS_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }

      case ADD_MEDSYSTEM_SUCCESS: 
        return {
          ...state,
          medSystems: [...state.medSystems, action.payload],
        }
      
      case SAVE_MEDSYSTEM_SUCCESS: 
        return state
      
      case DELETE_MEDSYSTEM_SUCCESS: 
        // console.log(action.payload)
        // console.log(state.medSystems)
        let index = state.medSystems.findIndex((x) => x.id === action.payload); 
        // console.log("index", index)
        state.medSystems.splice(index, 1)
        // console.log("spliced", state.medSystems)
        return {
          medSystems: state.medSystems
          //state.medSystems.slice(index + 1),
        }              
      default:
        return state
    }
  }

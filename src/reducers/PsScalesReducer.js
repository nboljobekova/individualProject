import {
  GET_PSSCALES_START, GET_PSSCALES_SUCCESS, GET_PSSCALES_FAIL, ADD_PSSCALES_SUCCESS, SAVE_PSSCALES_SUCCESS, DELETE_PSSCALES_SUCCESS
  } from "../actions/PsScalesActions"
  
  export const PsScalesReducer = (state = {
    psScales: [],
    status: null,
    error: null,
  }, action) => {
    console.log("action: ", action)
    switch(action.type){
      case GET_PSSCALES_START:
        return {
          ...state,
          status: "loading"
        }
      case GET_PSSCALES_SUCCESS:
        return {
          ...state,
          status: "success",
          psScales: action.payload
        }
      case GET_PSSCALES_FAIL:
        return {
          ...state,
          status: "error",
          error: action.payload
        }

      case ADD_PSSCALES_SUCCESS: 
        return {
          ...state,
          psScales: [...state.psScales, action.payload],
        }
      
      case SAVE_PSSCALES_SUCCESS: 
        return state
      
      case DELETE_PSSCALES_SUCCESS: 
        console.log(action.payload)
        console.log(state.psScales)
        let index = state.psScales.findIndex((x) => x.id === action.payload); 
        console.log("index", index)
        state.psScales.splice(index, 1)
        console.log("spliced", state.psScales)
        return {
          psScales: state.psScales
          //state.medSystems.slice(index + 1),
        }              
      default:
        return state
    }
  }
  
// export default MedSystemsReducer;
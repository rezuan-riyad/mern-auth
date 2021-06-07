export const loginState = {
  email: "",
  password: "",
  isLoading: false,
  isLoggedin: false,
  error: "",
  message: ""
}

export function loginReducer(state = loginState, action){
  switch(action.type){
    case 'STATE_CHANGE':
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    case 'LOGIN':
      return {
        ...state,
        error: "",
        isLoading: true
      }
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedin: true,
        message: action.payload
      }
    case 'FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: ""
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'LOGOUT':
      return loginState
    
    default:
      return state
  }
}
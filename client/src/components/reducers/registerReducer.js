export const signupState = {
  isSubmitting: false,
  isSubmitted: false,
  error: "",
  message: ""
}

export function signupReducer(state, action) {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        isSubmitting: true,
        isSubmitted: false
      }
    case 'SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        message: action.payload
      }
    case 'FAILED':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: false,
        error: action.payload
      }
    default:
      return state
  }
}

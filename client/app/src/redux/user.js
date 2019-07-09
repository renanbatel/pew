// Action types
export const actionTypes = {
  USER_UPDATE_LOADING: "USER_UPDATE_LOADING",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  SIGNUP_REQUEST: "SIGNUP_REQUEST",
}

// Initial state
export const initialState = {
  loading: true,
  current: null,
}

// Actions
export const loginRequest = payload => ( {
  type: actionTypes.LOGIN_REQUEST,
  payload,
} )

export const loginSuccess = data => ( {
  type: actionTypes.LOGIN_SUCCESS,
  data,
} )

export const logoutRequest = () => ( {
  type: actionTypes.LOGOUT_REQUEST,
} )

export const logoutSuccess = () => ( {
  type: actionTypes.LOGOUT_SUCCESS,
} )

export const signupRequest = payload => ( {
  type: actionTypes.SIGNUP_REQUEST,
  payload,
} )

export const updateLoading = loading => ( {
  type: actionTypes.USER_UPDATE_LOADING,
  loading,
} )

export default ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        current: action.data,
      }
    }
    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        current: null,
      }
    }
    case actionTypes.USER_UPDATE_LOADING: {
      return {
        ...state,
        loading: action.loading,
      }
    }
    default:
      return state
  }
}

// Action types
export const actionTypes = {
  PROFILE_UPDATE_LOADING: "PROFILE_UPDATE_LOADING",
  PROFILE_REQUEST: "PROFILE_REQUEST",
  PROFILE_SUCCESS: "PROFILE_SUCCESS",
  PROFILE_FOLLOW_REQUEST: "PROFILE_FOLLOW_REQUEST",
  PROFILE_FOLLOW_SUCCESS: "PROFILE_FOLLOW_SUCCESS",
  PROFILE_UNFOLLOW_REQUEST: "PROFILE_UNFOLLOW_REQUEST",
  PROFILE_UNFOLLOW_SUCCESS: "PROFILE_UNFOLLOW_SUCCESS",
}

// Initial state
export const initialState = {
  loading: true,
  profile: {
    user: null,
    posts: [],
  }
}

// Actions
export const profileRequest = payload => ( {
  type: actionTypes.PROFILE_REQUEST,
  payload,
} )

export const profileSuccess = data => ( {
  type: actionTypes.PROFILE_SUCCESS,
  data,
} )

export const profileFollowRequest = payload => ( {
  type: actionTypes.PROFILE_FOLLOW_REQUEST,
  payload,
} )

export const profileFollowSuccess = data => ( {
  type: actionTypes.PROFILE_FOLLOW_SUCCESS,
  data,
} )

export const profileUnfollowRequest = payload => ( {
  type: actionTypes.PROFILE_FOLLOW_REQUEST,
  payload,
} )

export const profileUnfollowSuccess = data => ( {
  type: actionTypes.PROFILE_FOLLOW_SUCCESS,
  data,
} )

export const profileUpdateLoading = loading => ( {
  type: actionTypes.PROFILE_UPDATE_LOADING,
  loading,
} )

export default ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.data,
      }
    }
    case actionTypes.PROFILE_FOLLOW_SUCCESS: {
      /* return {
        ...state,
        posts: action.data,
      } */
    }
    case actionTypes.PROFILE_UNFOLLOW_SUCCESS: {
      /* return {
        ...state,
        posts: action.data,
      } */
    }
    case actionTypes.PROFILE_UPDATE_LOADING: {
      return {
        ...state,
        loading: action.loading,
      }
    }
    default:
      return state
  }
}

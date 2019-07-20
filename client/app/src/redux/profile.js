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
  content: {
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
  type: actionTypes.PROFILE_UNFOLLOW_REQUEST,
  payload,
} )

export const profileUnfollowSuccess = data => ( {
  type: actionTypes.PROFILE_UNFOLLOW_SUCCESS,
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
        content: action.data,
      }
    }
    case actionTypes.PROFILE_FOLLOW_SUCCESS: {
      const newUser = state.content.user

      newUser.followers.push( action.data )

      return {
        ...state,
        content: {
          ...state.content,
          user: newUser,
        }
      }
    }
    case actionTypes.PROFILE_UNFOLLOW_SUCCESS: {
      const newUser = state.content.user

      newUser.followers = newUser.followers.filter( userId => userId !== action.data )

      return {
        ...state,
        content: {
          ...state.content,
          user: newUser,
        }
      }
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

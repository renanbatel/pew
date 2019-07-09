// Action types
export const actionTypes = {
  TIMELINE_UPDATE_LOADING: "TIMELINE_UPDATE_LOADING",
  TIMELINE_REQUEST: "TIMELINE_REQUEST",
  TIMELINE_SUCCESS: "TIMELINE_SUCCESS",
  TIMELINE_POST_REQUEST: "TIMELINE_POST_REQUEST",
  TIMELINE_POST_SUCCESS: "TIMELINE_POST_SUCCESS",
}

// Initial state
export const initialState = {
  loading: true,
  posts: [],
}

// Actions
export const timelineRequest = () => ( {
  type: actionTypes.TIMELINE_REQUEST,
} )

export const timelineSuccess = data => ( {
  type: actionTypes.TIMELINE_SUCCESS,
  data,
} )

export const timelinePostRequest = payload => ( {
  type: actionTypes.TIMELINE_POST_REQUEST,
  payload,
} )

export const timelinePostSuccess = data => ( {
  type: actionTypes.TIMELINE_POST_SUCCESS,
  data,
} )

export const updateLoading = loading => ( {
  type: actionTypes.TIMELINE_UPDATE_LOADING,
  loading,
} )

export default ( state = initialState, action ) => {
  switch( action.type ) {
    case actionTypes.TIMELINE_SUCCESS: {
      return {
        ...state,
        posts: action.data,
      }
    }
    case actionTypes.TIMELINE_POST_SUCCESS: {
      const newState = [ action.data ].concat( state.posts )

      return {
        ...state,
        posts: newState,
      }
    }
    case actionTypes.TIMELINE_UPDATE_LOADING: {
      return {
        ...state,
        loading: action.loading,
      }
    }
    default:
      return state
  }
}

import {
  put,
  takeEvery,
  takeLatest,
  call,
  all,
  spawn
} from "redux-saga/effects"

import {
  actionTypes,
  timelineSuccess,
  timelinePostSuccess,
  updateLoading,
} from "../redux/timeline"
import pew from "../services/pew"

export function* handleRequest() {
  const response = yield call( pew.get, "user/timeline" )
  const { posts } = response.data

  yield put( timelineSuccess( posts ) )
  yield put( updateLoading( false ) )
}

export function* handlePostRequest( { payload } ) {
  const response = yield call( pew.post, "post", payload )
  const { post } = response.data

  yield put( timelinePostSuccess( post ) )
}

export function* watchRequest() {
  yield takeEvery( actionTypes.TIMELINE_REQUEST, handleRequest )
}

export function* watchPostRequest() {
  yield takeLatest( actionTypes.TIMELINE_POST_REQUEST, handlePostRequest )
}

export default function* watchTimeline() {
  yield all( [
    spawn( watchRequest ),
    spawn( watchPostRequest ),
  ] )
}

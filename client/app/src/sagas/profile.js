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
  profileSuccess,
  profileFollowSuccess,
  profileUnfollowSuccess,
  profileUpdateLoading,
} from "../redux/profile"
import pew from "../services/pew"

export function* handleProfileRequest( { payload } ) {
  const userResponse = yield call( pew.get, `user/${ payload.username }` )
  const postsResponse = yield call( pew.get, `user/${ payload.username }/posts` )
  const { user } = userResponse.data
  const { posts } = postsResponse.data

  yield put( profileSuccess( { user, posts } ) )
  yield put( profileUpdateLoading( false ) )
}

export function* handleProfileFollowRequest( { payload } ) {

}

export function* handleProfileUnfollowRequest( { payload } ) {

}

export function* watchProfileRequest() {
  yield takeLatest( actionTypes.PROFILE_REQUEST, handleProfileRequest )
}

export function* watchProfileFollowRequest() {
  yield takeEvery( actionTypes.PROFILE_FOLLOW_REQUEST, handleProfileFollowRequest )
}

export function* watchProfileUnfollowRequest() {
  yield takeEvery( actionTypes.PROFILE_UNFOLLOW_REQUEST, handleProfileUnfollowRequest )
}

export default function* watchProfile() {
  yield all( [
    spawn( watchProfileRequest ),
    spawn( watchProfileFollowRequest ),
    spawn( watchProfileUnfollowRequest ),
  ] )
}

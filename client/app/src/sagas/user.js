import {
  put,
  take,
  takeLatest,
  call,
  all,
  spawn
} from "redux-saga/effects"

import { KEY_JWT, KEY_USERNAME } from "../config"
import {
  actionTypes,
  loginSuccess,
  updateLoading,
  logoutSuccess,
} from "../redux/user"
import pew from "../services/pew"

export function* handleLogin( { payload } ) {
  if ( payload.token ) {
    try {
      pew.setAuthToken( payload.token )

      const response = yield call( pew.get, "user/me", payload )
      const {
        _id,
        email,
        name,
        username,
      } = response.data
      
      yield put( loginSuccess( {
        _id,
        email,
        name,
        username,
      } ) )
      yield put( updateLoading( false ) )
    } catch ( error ) {
      yield call( handleLogout )
    }
  } else {
    try {
      const response = yield call( pew.post, "auth/signin", payload )
      const { currentUser, token } = response.data

      localStorage.setItem( KEY_JWT, token )
      localStorage.setItem( KEY_USERNAME, currentUser.username )
      pew.setAuthToken( token )
  
      yield put( loginSuccess( currentUser ) )
      yield put( updateLoading( false ) )
    } catch ( error ) {
      console.error( error )
    }
  }
}

export function* handleLogout() {
  localStorage.removeItem( KEY_JWT )
  pew.clearAuthToken()
  
  yield put( logoutSuccess() )
}

export function* handleSignup( { payload } ) {
  const { username, password } = payload

  yield call( pew.post, "auth/signup", payload )
  yield call( handleLogin, { payload: { username, password } } )
}

export function* watchLogins() {
  while ( true ) {
    const loginAction = yield take( actionTypes.LOGIN_REQUEST )

    yield call( handleLogin, loginAction )
    yield take( actionTypes.LOGOUT_REQUEST )
    yield call( handleLogout )
  }
}

export function* watchSignup() {
  yield takeLatest( actionTypes.SIGNUP_REQUEST, handleSignup )
}

export default function* watchUser() {
  yield all( [
    spawn( watchLogins ),
    spawn( watchSignup ),
  ] )
}

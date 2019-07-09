import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import createSagaMiddleware from "redux-saga"

import rootSaga from "../sagas"
import user, { initialState as userInitialState } from "./user"
import timeline, { initialState as timelineInitialState } from "./timeline"
import profile, { initialState as profileInitialState } from "./profile"

export const reducers = combineReducers( {
  user,
  timeline,
  profile,
} )

export default ( initialState = {
  user: userInitialState,
  timeline: timelineInitialState,
  profile: profileInitialState,
} ) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware( sagaMiddleware )
  )

  sagaMiddleware.run( rootSaga )

  return store
}

import { all, spawn } from "redux-saga/effects"

import user from "./user"
import timeline from "./timeline"
import profile from "./profile"

export default function* rootSaga() {
  yield all( [
    spawn( user ),
    spawn( timeline ),
    spawn( profile ),
  ] )
}

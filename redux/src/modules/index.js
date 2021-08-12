// reducer 두 개를 합침

import { combineReducers } from "redux"
import counter from './counter'
import todos from './todos'

const rootReducer=combineReducers({
    counter,
    todos
})

export default rootReducer
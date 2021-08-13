import {delay, put, takeEvery, takeLatest} from 'redux-saga/effects'
// saga middleware가 작동하도록 명령하는것

const INCREASE='INCREASE'
const DECREASE='DECREASE'
const INCREASE_ASYNC='INCREASE_ASYNC'
const DECREASE_ASYNC='DECREASE_ASYNC'

// action 생성 함수
export const increase=()=>({type:INCREASE})
export const decrease=()=>({type:DECREASE})
export const increaseAsync=()=>({type:INCREASE_ASYNC})
export const decreaseAsync=()=>({type:DECREASE_ASYNC})

// generator function
function* increaseSage(){
    yield delay(1000)
    yield put(increase())   // dispatch와 유사
}

function* decreaseSage(){
    yield delay(1000)
    yield put(decrease()) 
}

export function* counterSaga(){
    yield takeEvery(INCREASE_ASYNC,increaseSage)    //INCREASE_ASYNC가 실행되면 increaseSage를 실행
    yield takeLatest(DECREASE_ASYNC,decreaseSage)
}

const initialState=0

export default function counter(state=initialState,action){
    switch(action.type){
        case INCREASE:
            return state+1
        case DECREASE:
            return state-1
        default: return state
    }
}

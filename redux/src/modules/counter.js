// counter redux module

// action type
const SET_DIFF='counter/SET_DEFF'   // counter 붙이는 이유 = 다른 모듈과 이름 중복을 방지하기 위해
const INCREASE='counter/INCREASE'
const DECREASE='counter/DECREASE'

// action 생성 함수
export const setDiff=diff=>({type:SET_DIFF, diff})
export const increase=()=>({type:INCREASE})
export const decrease=()=>({type:DECREASE})

// 초기 상태
const initialState={
    number:0,
    diff:1
}

// reducer
export default function counter(state=initialState,action){
    switch(action.type){
        case SET_DIFF:
            return {
                ...state,
                diff:action.diff
            }
        case INCREASE:
            return {
                ...state,
                number:state.number+state.diff
            }
        case DECREASE:
            return {
                ...state,
                number:state.number-state.diff
            }
        default: return state
    }
}
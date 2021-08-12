const INCREASE='INCREASE'
const DECREASE='DECREASE'

export const increase=()=>({type:INCREASE})
export const decrease=()=>({type:DECREASE})

// 액션이 dispatch되는 속도를 1초 delay (console에 1초 후에 보임)
export const increaseAsync=()=>(dispatch)=>{
    setTimeout(()=>{
        dispatch(increase())
    },1000)
}
// export const increaseAsync=//여기는 thunk함수를 만들어주는 함수//()=>//까지가 thunk함수//(dispatch)=>{
//     setTimeout(()=>{
//         dispatch(increase())
//     },1000)
// }
export const decreaseAsync=()=>(dispatch)=>{
    setTimeout(()=>{
        dispatch(decrease())
    },1000)
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

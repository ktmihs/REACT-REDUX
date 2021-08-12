import {createStore} from 'redux'

const initialState={
    counter:0,
    text:'',
    list:[]
}
const INCREASE='INCREASE'
const DECREASE='DECREASE'
const CHANGE_TEXT='CHANGE_TEXT'
const ADD_TO_LIST='ADD_TO_LIST'

// action creator
const increase=()=>({
    type:INCREASE,
})
const decrease=()=>({
    type:DECREASE
})
const changeText=(text)=>({
    type:CHANGE_TEXT,
    text
})
const addToList=(item)=>({
    type:ADD_TO_LIST,
    item
})

// reducer
// 초기상태를 만들 때 리듀서를 한번 호출하기 때문에 초기값이 있어야함
function reducer(state=initialState,action){
    switch(action.type){
        case INCREASE:
            return{
                ...state,
                counter:state.counter+1
            }
        case DECREASE:
            return{
                ...state,
                counter:state.counter-1
            }
        case CHANGE_TEXT:
            return{
                ...state,
                text:action.text
            }
        case ADD_TO_LIST:
            return{
                ...state,
                list: state.list.concat(action.item)    //불변성 유지하면서 배열에 추가해줌
            }
        default: return state
    }
}
// store생성
const store=createStore(reducer)
console.log(store.getState())

const listener=()=>{
    const state=store.getState()
    console.log(state)
}
// 구독
const unsubscribe=store.subscribe(listener)
// subscribe 잘 사용X

// 구독해지
// unsubscribe()

// action dispatch
store.dispatch(increase())
store.dispatch(decrease())
store.dispatch(changeText('안녕하세요'))
store.dispatch(addToList({id:1, text:'와우'}))

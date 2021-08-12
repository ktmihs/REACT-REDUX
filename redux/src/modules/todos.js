// todos redux module

// action type
const ADD_TODO='todos/ADD_TODO'
const TOGGLE_TODO='todos/TOGGLE_TODO'

let nextId=1
// action 생성 함수
export const addTodo=(text)=>({
    type:ADD_TODO,
    todo:{
        id: nextId++,
        text
    }
})
export const toggleTodo=id=>({
    type:TOGGLE_TODO,
    id
})

// 초기상태(빈배열)
const initialState=[]

// reducer
export default function todos(state=initialState,action){
    switch (action.type){
        case ADD_TODO:
            return state.concat(action.todo)
        case TOGGLE_TODO:
            return state.map(todo=>
                todo.id===action.id ?
                {...todo, done:!todo.done}
                    :
                todo)    // id가 일치하면 반전시킴, 아닐 경우 그대로
        default: return state
    }
}
import React,{useCallback} from 'react'
import Todos from '../components/Todos'
import {useSelector,useDispatch} from 'react-redux'
import { addTodo, toggleTodo } from '../modules/todos'

function TodosContaioner(){
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()

    // 매번 렌더링 될 때마다 새로 만드는 것이 아닌 재사용할 수 있도록 usecallback으로 감싸줌
    const onCreate=useCallback((text)=>dispatch(addTodo(text)),[dispatch])
    const onToggle=useCallback((id)=>dispatch(toggleTodo(id)),[dispatch])

    return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle}/>
}
export default TodosContaioner
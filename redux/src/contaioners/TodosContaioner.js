import React,{useCallback} from 'react'
import Todos from '../components/Todos'
import {connect} from 'react-redux'
import { addTodo, toggleTodo } from '../modules/todos'

function TodosContaioner({todos, addTodo, toggleTodo}){
    // 매번 렌더링 될 때마다 새로 만드는 것이 아닌 재사용할 수 있도록 usecallback으로 감싸줌
    const onCreate=useCallback((text)=>addTodo(text),[addTodo])
    const onToggle=useCallback((id)=>toggleTodo(id),[toggleTodo])

    return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle}/>
}
const mapStateToProps=(state)=>({todos:state.todos})
    const mapDispatchToProps={
        addTodo,
        toggleTodo
    }
export default connect(mapStateToProps,mapDispatchToProps)(TodosContaioner)

// 처럼 따로 작성하지 않고 한번에 작성해줘도 됨
// export default connect(
//     (state)=>({todos:state.todos}),
//     {
//         addTodo,
//         toggleTodo
//     }(TodosContaioner)
// )
import React,{useState} from 'react'

// 글을 입력할 때도 쓸데없이 렌더링 되는 것을 방지하기 위해 React.memo()로 감싸줌
// input에 대한 update 방지
const TodoItem=React.memo(function TodoItem({todo, onToggle}){
    return (
        // toggle이 true이면 글 가운데 선을 긋고 아니면 그대로
        <li style={{textDecoration:todo.done?'line-through':'none'}}
            onClick={()=>onToggle(todo.id)}>
            {todo.text}
        </li>    
    )
})

const TodoList=React.memo(function TodoList({todos, onToggle}){
    return (
        <ul>
            {
                todos.map(todo=>
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle}/>
                )
            }
        </ul>
    )
})
// local 상태 관리는 redux가 아닌 useState로 
function Todos({todos, onCreate, onToggle}){    // onToggle=> 각 항목들의 상태를 true에서 false로 false에서 true로 바꿔주는 함수
    const [text, setText]=useState('')
    const onChange=(e)=>setText(e.target.value)
    const onSubmit=(e)=>{
        e.preventDefault()
        onCreate(text)  // 새로운 data 가져오는 함수
        setText('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>  {/*onSubmit은 enter로도 인식됨 */}
                <input value={text} onChange={onChange} placeholder="할 일을 입력하세요..."/>
                <button type="submit">등록</button> {/* 버튼 클릭 시 submit이 되어서 form이 제출됨 */}
            </form>
            <TodoList
                todos={todos}
                onToggle={onToggle}
            />
        </div>
    )
}
export default React.memo(Todos)
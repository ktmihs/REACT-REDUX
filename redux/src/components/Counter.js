// presentational component: UI에 집중(필요한 값이나 함수는 props로 받아와서 사용)

import React from 'react'

function Counter({number,diff, onIncrease, onDecrease, onSetDiff}){
    const onChange=(e)=>{
        onSetDiff(parseInt(e.target.value, 10))
    }
    return(
        <div>
            <h1>{number}</h1>
            <div>
                <input type='number' value={diff} onChange={onChange}/>            
                <button onClick={onIncrease}>+</button>
                <button onClick={onDecrease}>-</button>
            </div>
        </div>
    )
}
export default Counter
// contaioner component: redux에 있는 상태를 조회하거나 action을 dispatch할 수 있는 component

import React from 'react'
import { bindActionCreators } from 'redux'
import Counter from '../components/Counter'
import {connect} from 'react-redux'
import { decrease, increase,setDiff } from '../modules/counter'

function CounterContaioner({number,diff,increase,decrease,setDiff}){
    
    return(
        <div>
            <Counter 
                number={number} 
                diff={diff} 
                onIncrease={increase} 
                onDecrease={decrease} 
                onSetDiff={setDiff}
            />
        </div>
    )
}

const mapStateToProps=(state)=>({
    number:state.counter.number,
    diff:state.counter.diff
})

// dispatch는 객체형태로 만들어주면 더 간단함
const mapDispatchToProps={
    increase,decrease,setDiff
}   // 함수가 아니라 객체라면 bindActionCreators가 없어도 자동으로 생성됨

// 하나씩 만들어주는 것과 동일(하단)
// const mapDispatchToProps=dispatch=>bindActionCreators({
//     increase,decrease,setDiff
// },dispatch)

// const mapDispatchToProps=(dispatch)=>({
//     onIncrease:()=>dispatch(increase()),
//     onDecrease:()=>dispatch(decrease()),
//     onSetDiff:(diff)=>dispatch(setDiff(diff))
// })
// 하나씩 만들어줄 때는 props이름이
// function CounterContaioner({number,diff,onIncrease,onDecrease,onSetDiff})

export default connect(mapStateToProps,mapDispatchToProps)(CounterContaioner)
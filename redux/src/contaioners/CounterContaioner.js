// contaioner component: redux에 있는 상태를 조회하거나 action을 dispatch할 수 있는 component

import React from 'react'
import Counter from '../components/Counter'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { decrease, increase,setDiff } from '../modules/counter'

function CounterContaioner(){
    // useSelector: 상태 조회 hook(state: redux의 현재 상태)
    const {number, diff}=useSelector(state=>({
        number:state.counter.number,
        diff:state.counter.diff
    }),shallowEqual
        // useSelector를 사용해서 여러 값을 가져와야할 때는 shallowEqual를 사용해서 비교를 해주거나
        // 각각을 따로 작성해야 함(=최적화)
        // ex) const number=useSelector(state=>number:state.counter.number)
        // shallowEqual의 기능 => (left, right)=>{return left.diff===right.diff && left.number === right.number}
    )
    // useDispatch: 언제든지 dispatch를 사용해서 특정 action을 발생할 수 있음
    const dispatch=useDispatch()

    // action 생성 함수들이 호출되면 action객체가 만들어져 dispatch가 됨
    const onIncrease=()=>dispatch(increase())
    const onDecrease=()=>dispatch(decrease())
    const onSetDiff=(diff)=>dispatch(setDiff(diff))
    return(
        <div>
            <Counter 
                number={number} 
                diff={diff} 
                onIncrease={onIncrease} 
                onDecrease={onDecrease} 
                onSetDiff={onSetDiff}
            />
        </div>
    )
}
export default CounterContaioner
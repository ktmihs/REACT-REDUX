// custom middleware

const myLogger=store=>next=>action=>{
    console.log(action)
    console.log('\tPrev',store.getState())  // action이 dispatch되기 전 결과 보여짐
    const result=next(action)
    console.log('\tNext',store.getState())  // action이 dispatch된 후 결과 보여짐
    return result   // container에서 dispatch했을 때, return 하는 값이 여기서의 result
}

export default myLogger
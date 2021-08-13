# 📝 REDUX MIDDLE-WARE

### 특징
- action이 dispatch 될 때 middleware에서 특정 조건에 따라 무시할 수 있음
(리듀서에서 처리하지 않음)

- action이리듀서에 전달되기 전에 middleware에서 특정 코드를 실행할 수 있음
(action 처리 과정에서 수정이나 console출력 가능, 또 다른 action dispatch 가능)

### 주로 사용할 때
- 비동기 작업을 처리할 때 사용 ex) API 요청

### middleware 라이브러리 종류
- redux-thunk
- redux-saga
- redux-observable
- redux-promise-middleware
- ...

<br/><hr/><br/>

# ✔ middleware
```
// 작성
const myLogger=store=>next=>action=>{
    // 함수를 리턴하는 함수를 리턴하는 함수   
}

// 적용방법(index.js)
const store=createStore(rootReducer,applyMiddleware([MIDDLEWARE_NAME])) // 처럼 createStore의 두 번째 인자에 applyMiddleware(작성한 미들웨어명)를 넣어줌


```

### next
- middleware에서 action을 받아왔을 때, 다음 middleware에 전달하는 함수
- middleware를 1개 이상 받을 수 있음
- 마지막에는 next로 리듀서로 전달
- next(action) 으로 호출

##### next vs dispatch
- next는 계속 이어서 전달
- store.dispatch는 새로 전달

<br/><hr/><br/>

# ✔ REDUX-THUNK
- 액션 객체가 아닌 함수를 디스패치 할 수 있음
- 함수가 아니면 다음 미들웨어로 전달

### thunk함수 
- 액션을 디스패치할 수도 있고, 상태를 조회할 수도 있음 
- redux-thunk 를 사용할 때는 logger를 맨 나중에 작성해줘야 함 <br/> ex) const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk,logger)))
- promise를 다룰 때 유용하게 쓰일 수 있음

### 리팩토링
- 반복되는 코드를 간결하게 작성하기 위해 util을 작성함

<br/><hr/><br/>

### history in thunk
- thunk 내부에서 특정 주소로 이동하고 싶을 때
- ex. 로그인 성공 시 특정 페이지로 이동


### json-server 
- FE 연습할 때 임시 서버로 유용함

<br/><hr/><br/>

### CORS and Proxy
- axios 같은 client로 api를 호출하게 될 때, 기본적으로는 브라우저에서 띄우고 있는 도메인과 호출하고 있는 api도메인이 다르다면 브라우저에서 해당 api에 대한 결과물을 띄울 수 없음

### proxy
- browser에서 api를 요청하게 될 때, 백엔드 서버에 직접적으로 요청하지 않고, 현재 개발 서버의 주소로 요청하게 됨
- 웹팩 개발서버에서 요청을 받아 백엔드 서버로 요청을 전달한 후, 응답을 다시 프록시를 통해 개발서버에서 브라우저로 전달함
- 원래는 웹팩에서 설정해줘야 하지만 create-react-app으로 만든 project에서는 package.json에서 proxy를 설정해줌으로써 쉽게 적용할 수 있음

```
"proxy":"http://localhost:4000"
```

<br/><hr/><br/>

# ✔ REDUX-SAGA
- 액션을 모니터링하고 있다가 특정 액션이 발생하면 그에 따라 특정 작업을 하는 방식으로 사용

- redux-thunk로 작업하기에 매우 까다로운 작업들을 할 수 있음
    - 비동기 작업을 처리할 때 기존 요청을 취소할 수 있음
    - 특정 액션이 발생했을 때, 이에 따라 다른 액션을 디스패치하거나, 자바스크립트 코드를 실행할 수 있음

    ##### thunk
    함수 타입의 객체 값을 디스패치
    ##### saga
    순수 액션, 객체 타입 값이 들어있는 객체를 사용

    - 웹소켓을 사용하는 경우, Channel이라는 기능을 사용하여 더욱 효율적을 코드를 관리할 수 있음
    - 비동기 작업이 실패했을 때, 재시도하는 기능을 구현할 수 있음
    
### Generator 문법
- 함수의 흐름을 특정 구간에 멈춰놓았다가 나중에 다시 실행할 수 있음
- 결과값을 여러번 내보낼 수 있음

```
function* generatorFunction(){
    console.log('hi')
    yield 1 // 를 통해 여러번 내보내기 가능
    // 함수의 흐름을 멈춰놨다가 1을 반환함
    console.log('generator)
    yield 2
    return 3
}

>> const generator=generatorFunction()
>> generator
    >> generatorFunction {<suspended>}  // 현재 함수 멈춰있음
>> generator.next() // 실행
    >> hi
    >> {value:1, done:false}    //yield 1까지하고 멈춤
>> generator.next() // 실행
    >> generator
    >> {value:2, done:false} 
>> generator.next() // 실행
    >> {value:3, done:true}
>> generator
    >> generatorFunction {<close>}  // return후 종료  
```

```
function* sumFunction(){
    console.log('start')
    let a=yield // 입력을 통해 a를 받음
    console.log('a를 받았습니다.')
    let b=yield // 입력을 통해 b를 받음
    console.log('b를 받았습니다.')
    return a+b  // a+b를 반환

>> const sum=sumFunction()
>> sum.next() // 실행
    >> start
    >> {value:undefined, done:false}    //yield 1까지하고 멈춤
>> sum.next(2) // 실행
    >> a를 받았습니다.
    >> {value:undefined, done:false} 
>> sum.next(5) // 실행
    >> b를 받았습니다.
    >> {value:7, done:true}
}
```

```
function* infiniteFunction(){
    let result=0
    while(true){
        result+=yield result
    }

>> const infinite=infiniteFunction()
>> infinite.next() // 실행
    >> {value:0, done:false}    //yield 1까지하고 멈춤
>> infinite.next(10) // 실행
    >> {value:10, done:false} 
>> sum.next(25) // 실행
    >> {value:35, done:false}
// 끝나지 않음
}
```

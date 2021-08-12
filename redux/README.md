# REDUX 📝

- 가장 사용률이 높은 상태 관리 라이브러리
- 다른 파일로 분리시켜 관리 가능
- global도 상태 관리 쉬움

### contextAPI + useReducer = redux 와 매우 유사

<br/>
<hr/>
<br/>

# ✔ REDUX 장점
1. 미들웨어
	비동기 작업을 더욱 체계적으로 관리 가능
2. 유용한 함수와 Hooks 지원
	context의 경우, 기능 만들 때마다 여러 함수들을 계속 만들어야하지만 
	redex의 경우, connect 사용으로 dispatch등을 props로 받아서 사용하거나 Hook을 사용할 수 있음
3. 기본적인 최적화가 이미 되어있음
4. 하나의 커다란 상태
	기능별로 따로 만들지 않고, 하나로 만들면 됨
5. devTools 
	변화관리 쉬움
6. 이미 사용중인 프로젝트가 많음

# ✔ Redux vs Context API
- 프로젝트 규모가 큰 경우(Redux), 작은 경우(Context API)
- 비동기 작업을 자주 하는 경우(Redux), 아닌 경우(Context API)
- 리덕스가 편할 경우(Redux), 아닌 경우(Context API)

<br/>
<hr/>
<br/>

# ✔ 용어 설명
### Action - 상태에 어떤 변화가 필요한 경우 발생(하나의 객체)
```
{
	type: "TOGGLE_VALUE",	// 필수
	data:{			// 선택(아무거나 써도 됨)
		id:0,
		text:"redux 배우기"
	}
}
```
### Action Creator - 액션을 만들어주는 함수, 단순히 파라미터를 받아와 액션 객체를 만들어줌
```
export function addTodo(data){
	return{
		type:"ADD_TODO",
		data
	}
}
// 화살표 함수로도 생성가능
export const changeInput=(text)=>({
	type:"CHANGE_INPUT",
	text
})
```
### Reducer - 변화를 일으키는 함수(새로운 상태 만들어줌),<br/> 타입이 무엇인지에 따라 작업을 다르게 해줌(불변성 유지해줘야함(spread연산자 사용 등으로))
```
function counter(state, action){
	switch(action.type){
		case: 'INCREASE': return state+1
		case: 'DECREASE': return state-1
		default: return state
	}
}
```
### Store - 한 앱 당 하나의 스토어가 존재함, 현재 앱의 상태와 리듀서가 들어있음(+ 내장함수들)
##### dispatch - 액션을 발생시키는 것, 액션을 store에 전달하는 것
```
dispatch({type:'INCREASE'})
```
##### Subscribe - 호출할 때 파라미터로 특정 함수를 넣어주면 액션이 디스패치 될 때마다 설정한 함수가 호출됨<br/>store 상태가 업데이트 될 때마다 특정 함수 호출 가능
component가 redux에 구독하는 것

dispatch : 액션 발생
subscribe: 액션 발생 시 특정 함수 호출
<br/>
<hr/>
<br/>

# ✔ 지켜야할 규칙 

1. 하나의 애플리케이션엔 하나의 스토어가 존재
2. 상태는 읽기 전용 (불변성 지켜야 함)
3. 변화를 일으키는 함수 리듀서는 순수한 함수여야 함<br/>(이전의 상태는 직접 변경하지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환해야함)	=> 불변성 유지!<br/>똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환해야 함<br/>new Date(), Math.random()등 사용XXX

<br/>
<hr/>
<br/>

# ✔ redux module
- 액션 타입, 액션 생성 함수, 리듀서
	-> 하나의 파일에 몰아서 작성 (= ducks 패턴)

### yarn add redux-devtools-extension
- composeWithDevTools를 createStore 두 번째 parameter로 받아서 사용 -> 개발자 도구에서 redux 상태를 조회하고 dispatch된 action의 내역을 볼 수 있음
(먼저 구글 chrome에서 redux devtools 설치해야함)

### connect HOC
- 재사용되는 값, 함수를 props로 받아올 수 있께 해주는 옛날 패턴
- 요즘은 hooks로 대체
- 보통 class형으로 작성할 때 사용


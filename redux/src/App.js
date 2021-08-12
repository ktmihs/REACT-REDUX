import React from 'react'
import CounterContaioner from './contaioners/CounterContaioner';
import TodosContaioner from './contaioners/TodosContaioner';

function App() {
  return (
    <div>
      <CounterContaioner/>
      <hr/>
      <TodosContaioner/>
    </div>
  );
}

export default App

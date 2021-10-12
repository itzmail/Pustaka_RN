import React, { useState } from 'react';

// dibawah ini merupakan contoh function yang dijadikan argument untuk state count
// function Counter() {
//   console.log('Run Count');
//   return 4;
// }

function State() {
  const [state, setState] = useState({ count: 4, theme: 'blue' });
  const count = state.count;
  const theme = state.theme;

  function decrementCount() {
    setState((prevState) => {
      return { ...prevState, count: prevState.count - 1 };
    });
  }

  function incrementCount() {
    setState((prevState) => {
      return { ...prevState, count: prevState.count + 1 };
    });
  }

  return (
    <>
      <button onClick={decrementCount}>-</button>
      <span>{count} </span>
      <span>{theme}</span>
      <button onClick={incrementCount}>+</button>
    </>
  );
}

export default State;

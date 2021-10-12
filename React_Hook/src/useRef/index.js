import React, { useState, useRef, useEffect } from 'react';

export default function Ref() {
  const [name, setName] = useState('');
  const renderCount = useRef(0);
  const inputRef = useRef();
  const prevName = useRef('');
  //   const [renderCount, setRenderCount] = useState(0)

  /** 
  * * Akan terjadi infinite loop
  useEffect(() => {
    setRenderCount((prevRender) => prevRender + 1);
  }); */

  /* useEffect(() => {
    renderCount.current = renderCount.current + 1;
  }); */

  useEffect(() => {
    return (prevName.current = name);
  }, [name]); // akan menyimpan nilai sebelumnya

  function focus() {
    inputRef.current.focus();
    inputRef.current.value = 'Halo';
  }

  return (
    <>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        My name is {name}. Before that, my name is {prevName.current}
      </div>
      {/* <div>I rendered {renderCount.current} times</div> */}
      <button onClick={focus}>Focus to Input</button>
    </>
  );
}

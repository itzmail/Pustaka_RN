import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useLocalLog from './useLocalLog';

export default function Custom() {
  const [name, setName] = useLocalStorage('name', '');
  useLocalLog(name);
  return (
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  );
}

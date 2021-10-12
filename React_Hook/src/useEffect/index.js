import React, { useState, useEffect } from 'react';

export default function Effect() {
  const [resourceType, setResourceType] = useState('posts');

  // 1 . Get API
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [resourceType]);

  useEffect(() => {
    console.log(`componentDidMount ${resourceType}`);
    return () => console.log(`ComponentWillUnmount`); // yang akan dijalan kan ini dulu karena bersifat menghapus kode sebelumnya yaitu console.log(resource)
  }, [resourceType]);

  const [windowWidth, setWindowWith] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWindowWith(window.innerWidth);
    setwindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div>
        <button onClick={() => setResourceType('posts')}>Posts</button>
        <button onClick={() => setResourceType('users')}>Users</button>
        <button onClick={() => setResourceType('comments')}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
      <div>
        <h3>Dinamik ukuran window</h3>
        <p>Lebar window :{windowWidth} px</p>
        <p>Tinggi window:{windowHeight} px</p>
      </div>
      <h3>GET API</h3>
      {items.map((item) => {
        return <pre>{JSON.stringify(item)}</pre>;
      })}
    </>
  );
}

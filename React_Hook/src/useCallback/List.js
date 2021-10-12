import React, { useEffect, useState } from 'react';

export default function List({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems());
    console.log('update items');
  }, [getItems]);

  return items.map((item) => <div key={item}>{item}</div>);
}

# useCallback() 

useCallback() memiliki fungsi yang sama dengan `useMemo()`. yang membedakan adalah 
* useCallback() return seluruh *function*
* useMemo() hanya return *value of function*

cara penggunaan useCallback sama dengan useMemo

``` javascript
export default function Callback() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  const getItems = () => {
    return [number, number + 1, number + 2];
  };

  const theme = {
    backgroundColor: dark ? '#333' : '#fff',
    color: dark ? '#fff' : '#333',
  };

  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle Theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}
```
`index.js` digunakan untuk menampilkan (seperti biasa)

``` javascript
export default function List({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems());
    console.log('update items');
  }, [getItems]);

  return items.map((item) => <div key={item}>{item}</div>);
}
```
`List.js` (digunakan untuk menampilkan angka)

pada file index.js function `getItems()` berjalan dengan semestinya tetapi ada hal yang janggal pada code tersebut ialah ketika kita klik `botton` "Toggle Theme" hal itu juga men-*trigger* file `List.js`. maka dari itu menggunakan useCallback()

Kenapa tidak menggunakan useMemo() => karena kita ingin me-return seluruh function nya sehingga jadinya seperti dibawah ini

``` javascript
  const [number, setNumber] = useState(1);

  const getItems = useCallback(() => {
    return [number, number + 1, number + 2];
  ), [number]};
```

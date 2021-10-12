## useEffect(function callback(), [])

**useEffect()** digunakan sebagai bentuk life cycle yang terdapat pada class component.

#### Syntax
``` javascript
const App = () => {
    ...
    useEffect(function() {
        let mounting = `bagian ini merupakan fase component didMount`
        return () => {
            let modified = `bagian ini merupakan fase update dan unMount`
        }
    })
}
```

#### Order of execution (urutan eksekusi) code

1. akan menjalankan variable *mounting*
2. lalu bila ada *return* di useEffect tersebut maka hal tersebut di panggil sebagai *clean up* code *mounting* 

### Summary

 * useEffect merupakan bentuk penyerderhanaan dari componentDidMount, componentDidUpdate, dan sterusnya dijadikan satu yaitu useEffect
 * secara *default*, react menjalankan effect setiap render, jadi bila effect ingin dijalankan maka harus di render ulang

#### Penjelasan

salah satu contoh yang menurutku complex

##### Get API
  ``` javascript
      const [items, setItems] = useState([]);
  ```
seperti yang kalian lihat pertama, kita buat state *items* yang gunanya untuk menampung array sehingga kita bisa buat *looping* seperti contoh dibawah ini

  ``` javascript 
  {items.map((item, index) => {
      return <pre>{JSON.stringify(item)}</pre>;
    })}
  ```

karena kita akan melakukan update maka kita perlu menggunakan useEffect sebagai lifecycle di react itu sendiri

  ``` javascript
      useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
          .then((response) => response.json())
          .then((json) => setItems(json));
          }, [resourceType]);
  ```
[resourceType] itu sendiri sebagai penanda untuk ada tidaknya perubahan pada state resourceType. jika ada perubahan maka ketika yang dijalan saat mountin (artinya diluar return) akan di *clean up* setelah itu, diisi kembali dengan perubahan yang baru.


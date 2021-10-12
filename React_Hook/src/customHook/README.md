# Custom Hook

jadi kita bisa membuat hook sendiri dengan cara membuat file dan diawali dengan kata ***use*** nama bebas. contoh `useLocalStorage.js`. cara menggunakannya sama dengan useState.

tidak peduli ktia menuliskan apa saja di custom hook yang terpenting custom tersebut berjalan dengan lancar

### Summary
untuk file `useLocalStorage.js`
``` javascript
function getSavedValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}
```
function ini memeiliki 2 parameter
* key digunakan nama atau state apa yang akan kita simpan di local storage
* initialValue berupa value dari key tersebut, bisa berupa *boolean*, *string*, bahkan bisa juga *function*

**Logic dari function getSavedValue**

`const savedValue` kita umpamakan saja bila semisal kita get REST API berupa JSON. jadi variable tersebut berupa JSON

condition : 

1. jika terdapat `savedValue` maka kembalikan variable tersebut
2. jika *initialValue* berupa function maka jalankan function `initialValue()`
3. jika tidak ada keduanya kembalikan nila itu secara default 

``` javascript
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
```

untuk inti dari costum hook di file ini, pada useEffect, kita mengubah data yang sudah  disimpan function `getSavedValue()` diubah menjadi string dan ditampilkan dilayar (index.js)

untuk file `useLocalLog` itu sederhana. hanya menjalankan useEffect saja
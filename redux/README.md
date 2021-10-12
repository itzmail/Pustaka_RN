## Redux

### Penjelaan Singkat

redux adalah state management, yang sifatnya global, mudah diprediksi, mudah untuk _debugging_

### Struktur Redux

Redux memiliki 3 struktur utama :

1. STORE => berguna untuk menyimpan data atau state
2. ACTION => berguna untuk melakukan penugasan atau _dispatch_ yang dapat mempengaruhi data di STORE
3. REDUCER => gunanya untuk sebagai validasi terhadap action yang nantinya akan cek apakah ACTION tersebut sesuai dengan yang ada di STORE
4. Dispatch => ini hanya sebagai pengeksekusi ACTION terhadap reducer

   **Ilustrasi**

   [<img src="src/pict/external-content.duckduckgo.com.png" alt="structure redux" width="70%">]

jadi urutannya seperti ini

`COMPONENT => mengirimkan DISPATCH berupa ACTION (yang sudah ditentukan) => REDUCER (cek apakah betul kalau action ini melakukan tindakan terhadap state di STORE) => STORE => update ke COMPONENT`

#### Contoh sederhana dari penggunaan redux

untuk _best practice_ ada di bawah ini

```javascript
// ACTION
const increment = () => {
  return {
    type: "INCREMENT", // NAME OF ACTION
  };
};

const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

// REDUCER
let numb = 0;
const counter = (numb, action) => {
  switch (action.type) {
    case "INCREMENT":
      return numb + 1;
    case "DECREMENT":
      return numb - 1;
  }
};

let store = createStore(counter);

// Display it in console
store.subscribe(() => console.log(store.getState()));

// Dispatch
store.dispatch(increment());
```

## Best Practice

jadi di folder src terdapat dua folder berupa (`actions & reducer`)

##### isi dari setiap folder

- actions (index.js)

```javascript
// const ini berupa constanta yang gunanya untuk mengurangi salah ketik pada action
export const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

// const dibawah ini berupa beberapa action yang nantinya di dispatch atau ditugaskan dan dikirm ke reducer
export const increment = (numb) => {
  return {
    type: ACTION.INCREMENT,
    payload: numb,
  };
};
export const decrement = () => {
  return {
    type: ACTION.DECREMENT,
  };
};
```

- reducer
  terdapat 2 file (counterReducer.js dan loggedReducer.js (bisa nambah)) dan satu file (index.js)

`loggedReducer.js`

```javascript
import { ACTION } from "../actions";

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case ACTION.SIGN_IN:
      return !state;
    default:
      return state;
  }
};

export default loggedReducer;
```

`counterReducer.js`

```javascript
import { ACTION } from "../actions";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return state + action.payload;
    case ACTION.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;
```

`index.js`

```javascript
import counterReducer from "./counterReducer";
import loggedReducer from "./loggedReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
});

export default allReducer;
```

**Catatan!** yang jadi pokok utama di sini di file index.js yang mana file ini menampung semua reducer. Jadi kita membutuhkan function dari redux yaitu `combineReducer` yang memiliki paramter berupa object. syntax-nya bisa lihat contoh di atas

setelah cara diatas selesaai, lanjut ke folder `namaProjectMu/index.js`

```javascript
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "./reducer";

let store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

pada file diatas kita menyimpan state terebut dari `/src/reducer` disimpan di `createStore()`

**catatan!** pada createStore() parameter kedua hanya untuk cek di website dengan extension redux dev tool

#### Selesai instalasi redux berhasil

### Cara memakai Redux

lihat file `/src/App.js`

```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions"; // function ini yang tadi kita buat

// useSelector untuk memilih spesifil state tersebut dari combinedReducer di folder reducer kalau kalian masih ingat di penjelasan di atas
// useDispatch untuk menugaskan action ke reducer

export default function App() {
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment(5))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      {isLogged ? <h3>Valuable Information I shouldn't see</h3> : ""}
    </div>
  );
}
```

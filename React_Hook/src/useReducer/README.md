# useReducer() 

function ini berguna sebagai manage state yang bisa berubah kapanpun itu. Pola ini hampir sama dengan ***library Redux***.

``` javascript
const [namaTerserah, dispatch] = useReducer(reducer, 0) 
// bila hanya satu state yang ditampung

const [state, dispatch] = useReducer(reducer, {count: 0})
// bila terdapat lebih dari satu state
```
penjelasan `useReducer()` terdapat dua parameter 
    
1. callback yaitu *reducer*
2. state-nya

Penjelasan `const [nameState, dispatch]`

1. namaState terserah
2. dispatch berguna sebagai function yang digunakan untuk pemanggilan update state tersebuts 


**Function Reducer**

function ini kita buat sendiri. function ini berfungsi sebagai pengolah update state 

``` javascript
function reducer(state, action) {
    return {count: state.count + 1}
}
```
penjelasan

function reducer memiliki dua parameter

1. `state` yang isinya bakal berubah
2. `action` aksi apa yang akan diolah. Dalam kasus ini, action `dispatch`

### Bagaimana kalau terdapat 2 state?
jadi pada kasus kali ini ialah bagaimana cara kita mengatasi 2 decrement yang berbeda tetapi di dalam `function increment` (pada contoh diatas)

``` javascript
function reducer(state, action) {
    switch (action.type) {
        case 'increment' :
            return {count : state.count + 1}
        case 'decrement' :
            return {count : state.count - 1}
        default : 
            return state
    }
}

// ...

function increment() {
    return dispatch({type: 'increment'}) // object type kita buat sendiri
}

function decrement () {
    return dispatch({type: 'decrement'})
}

return (
    <button onClick={decrement}>-</button>
    <span>{state.count}</span>
    <button onClick={increment}>+</button>
)
```

bisa menggunakan cara diatas tetapi untuk menghindari `bug` seperti kesalahan menulis. kita bisa membuat hal tersebut dengan cara menetapkan hal tersebut denga variable `const ACTIONS` (itu hanya contoh)

``` javascript
const ACTIONS = {
    INCREMENT : 'increment',
    DECREMENT : 'decrement'
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT :
            return {count : state.count + 1}
        case ACTION.DECREMENT :
            return {count : state.count - 1}
        default : 
            return state
    }
}

function increment() {
    return dispatch({type: ACTIONS.INCREMENT}) 
}

function decrement () {
    return dispatch({type: ACTION.DECREMENT})
}

// ...
```

kenapa `const action` menggunakan huruf kapital? karena variable tersebut penanda bahwa variable tersebut tidak akan berubah *ini hanya best practice*


### STUDY CASE
studi kasus kali ini kita akan membuat aplikasi todo 

``` javascript
export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
  }
}
```
code diatas dibuat untuk proses pengolahan data

``` javascript
const [todos, dispatch] = useReducer(reducer, []);
const [name, setName] = useState('');
```
kita buat inisialisasi terlebih dahulu atau lebih tepatnya kita buat state terlebih dahulu `useReducer()` digunakan state yang nantinya diolah

``` javascript
function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispacth={dispatch} />;
      })}
```

`function handleSubmit()` digunakan untuk pengiriman data yang nantinya diolah oleh `reducer`
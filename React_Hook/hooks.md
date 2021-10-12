# React Hooks

## Rule of Hooks

__Jangan panggil atau menggunakan hooks di dalam _loops_, _conditions_, *fungsi bersarang*.__

pada dasarnya hooks menggunakan fungsi javascript, tetapi untuk menggunakannya harus menggunakan **React Function Component**

## Only call Hooks from React functions

__Jangan menggunakan hooks dari fungsi javascript biasa__

* Gunakan hooks dari react function component
* Gunakan react dari hook costumisasi

#### Plug in

``` zsh
npm install eslint-plugin-react-hooks --save-dev
```

``` json
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}

```

package ini digunakan untuk mengatur agar codingan kita otomatis disesuaikan dengan aturan react hooks yang ada


### Penjelasan

urutan dalam mengeksekusi hooks seperti contoh dibawah ini

``` javascript
function Form() {
    // 1. Gunakan state nama sebagai  variabel 
    const [nama, setName] = useState('Ismail');

    // 2. Gunakan effect untuk mempertahankan bentuk
    useEffect(function persistForm() {
        localStorage.setItem('formData', name)
    });

     // 3. Gunakan state surname sebagai  variabel 
     const [surname, setSurname] = useState('Poppins');

     // 4. Gunakan effect untuk memperbaharui judul
     useEffect(function updateTitle() {
         document.title = name + ' ' + surname
     })

     // .....
}

```

Jadi bagai mana React tahu respond dari beberapa state? 

jawabanya **React bergantung pada urutan pemanggilan Hooks**

``` javascript

// ------------
// First render
// ------------
useState('Mary')           // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm)     // 2. Add an effect for persisting the form
useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle)     // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState('Mary')           // 1. Read the name state variable (argument is ignored)
useEffect(persistForm)     // 2. Replace the effect for persisting the form
useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle)     // 4. Replace the effect for updating the title

// ...

```
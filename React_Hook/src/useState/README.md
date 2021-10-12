## Summary
1. useState me-return array 
   ``` javascript 
    const [namestate, setNamestate] = useState('default value')
   ```
2. membuat function pada param useState gunanya untuk saat menjalankan state hal tersebut hanya merender sekali, sehingga memudah saat computing
   ``` javascript
    const [count, setCount] = useState(() => {
        return 4
     })
   ```
   * bila setCount memiliki 2 argumen function ketika kita buat dua seperti dibawah ini maka akan merterun dua-duanya
    ``` javascript
      function decrementCount() {
        setCount((prevCount) => prevCount - 1);
        setCount(prevCount => prevCount -1)
    }
    ```
    * Sifat setState pada react hook bukan bersifat merge (menggabungkan) seperti di class
    ``` javascript
      function decrementCount() {
        setCount((prevState) => {
            return { ...prevState, count: prevState.count - 1 };
        });
    }
    ```
    jadi hasilnya tulisan warna biru tidak hilang, dan akan merge tampilan sebelumnya. maka dari itu perlu menggunakan spread operator

    * Ada trick lain selain menggunakan semua state digabungkan. dengan cara membuat state lainnya dan ini merupakan __*best practice*__
    ``` javascript
        const [count, setCount] = useState(4);
        const [theme, setTheme] = useState('blue')
    ```
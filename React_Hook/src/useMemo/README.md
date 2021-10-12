## useMemo(callback(), [change])

useMemo ini digunakan ketika kita menuliskan code dan komputer akan mengingat code atau value yang dihasilkan untuk tidak di render ulang

#### Contoh

1. Mengingat Pattern
   
contoh seperti ini 
``` javascript
    function slowFunction(num) {
      console.log('Calling Slow Function');
        for (let i = 0; i <= 10000000000; i++) {
            return num * 2;
        }
    }
```

ketika kita menuliskan *function* ini maka yang terjadi pc kita akan terasa berat dikarenakan *looping* yang terlalu banyak. 

karena *looping* tersebut memiliki pola yang sama (yaitu let i + 1), maka hal tersebut bisa diingat oleh computer sehingga computer tidak perlu re-render code tersebut

> INGAT!! React Hook atau function component bersifat rerender tidak merge kode tersebut bila terdapat componentDidUpdate

sehingga kita bisa menggunakan useMemo seperti di bawah ini

``` javascript
    const doubleNumber = useMemo(() => {
        return slowFunction(number);
    }, [number]);

    // ...

    return (
        // ...
        <div style={themeStyles}>{doubleNumber}</div>
    )
```

2. Mengigat value dimana data tersebut berada ditempat yang sama dengan state yang dirubah
   
``` javascript
    // before
    const themeStyles = {
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black',
    }


    // after
    const themeStyles = useMemo(() => {
       return {
         backgroundColor: dark ? 'black' : 'white',
         color: dark ? 'white' : 'black',
       };
    }, [dark]);

    return (
    <>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
            />
            <button onClick={() => setDark((prevDark) => !prevDark)}>Change Theme</button>
            <div style={themeStyles}>{doubleNumber}</div>
        </>
    );
```

di kolom ***before*** hal teresbut sebenarnya berjalan, tetapi yang dimasalahkan ialah saat kita menginput angka di tag `<input>` juga ikut berubah. maka dari itu agar komputer mengingat value tersebut dan tidak berhubungan dengan variable `const themeStyle`  

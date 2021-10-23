## React Native Date Time Picker

Library ini berguna untuk mengambil tanggal atau waktu dengan UI yang bersahabat

**Sumber Materi**
[React-Native-Modal-DateTime-Picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker)

### Instalasi Library

```
# using npm
$ npm i react-native-modal-datetime-picker @react-native-community/datetimepicker

# using yarn
$ yarn add react-native-modal-datetime-picker @react-native-community/datetimepicker

```

#### Note

yang perlu menjadi catatan ialah mengubah format tanggalan
jadi di sini menggunakan fitur dari javascript sendiri yaitu `Date()`

contohnya di bawah ini

```javascript
const [date, setDate] = useState(new Date());

useEffect(() => {
  const formattedDate =
    date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
  console.log(`buat sendiri ${formattedDate}`);
}, [date]);
```

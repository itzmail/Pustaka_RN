## Documentation of this screen

---

### Pre-reuquiste

> Library yang diperlukan
>
> - @react-native-community/geolocation, library ini untuk mengetahui location user sekaran ada dimana
> - react-native-permissions, library ini memiliki fitur untuk menanyakan apakah user menizinkan untuk membuka salah satu fitur di perangkatnya
> - react-native-snap-carousel, library ini memilik fitur sama dengan react native swiper

### Link Documentation of Library

- [RN_Geolocation](https://github.com/react-native-geolocation/react-native-geolocation)
- [RN_Permissions](https://github.com/zoontek/react-native-permissions)
- [RN_Carousel](https://github.com/meliorence/react-native-snap-carousel)

---

#### Penjelasan Function yang digunakan

1. Memposisikan Lokasi user sekarang

```javascript
async requestLocationPermission() {
    if (Platform.OS === 'ios') {
      let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      // console.log(`iphone ${response}`)

      if(response === 'granted') {
        this.locateCurrentPosition()
      }
    } else {
      let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      // console.log(`android ${response}`)

      if(response === 'granted') {
        this.locateCurrentPosition()
      }
    }
  }
```

### Android flow

```
 ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ check(PERMISSIONS.ANDROID.CAMERA) ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                   │
       Apakah fitur ini tersedia
           diperangkat ?
                   │           ╔════╗
                   ├───────────║ NO ║──────────────┐
                   │           ╚════╝              │
                ╔═════╗                            ▼
                ║ YES ║                 ┌─────────────────────┐
                ╚═════╝                 │ RESULTS.UNAVAILABLE │
                   │                    └─────────────────────┘
           Apakah izin
           dapat diminta?
                   │           ╔════╗
                   ├───────────║ NO ║──────────────┐
                   │           ╚════╝              │
                ╔═════╗                            ▼
                ║ YES ║                  ┌───────────────────┐
                ╚═════╝                  │ RESULTS.BLOCKED / │
                   │                     │  RESULTS.GRANTED  │
                   ▼                     └───────────────────┘
          ┌────────────────┐
          │ RESULTS.DENIED │◀──────────────────────┐
          └────────────────┘                       │
                   │                               │
                   ▼                               │
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓         ╔════╗
┃ request(PERMISSIONS.ANDROID.CAMERA) ┃         ║ NO ║
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛         ╚════╝
                   │                               │
         apakah user mengizinkan                   │
            permintaan tersebut ?                  │
                   │           ╔════╗     Ditanya lagi perizinannya
                   ├───────────║ NO ║─────"Never ask again" ?
                   │           ╚════╝              │
                ╔═════╗                         ╔═════╗
                ║ YES ║                         ║ YES ║
                ╚═════╝                         ╚═════╝
                   │                               │
                   ▼                               ▼
          ┌─────────────────┐             ┌─────────────────┐
          │ RESULTS.GRANTED │             │ RESULTS.BLOCKED │
          └─────────────────┘             └─────────────────┘

```

setelah melalu proses perizinan maka akan menjalankan fungsi di bawah ini (bila disetujui)

```javascript
locateCurrentPosition() {
    Geolocation.getCurrentPosition(
      // Success
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }

        this.setState({initialPosition: region})
        this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
      },
      // Error
      error => console.log(error.message),
      // Option => fitur tambahan
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    )
  }
```

2. Menyesuaikan posisi gambar dengan maps

untuk fitur kali ini menggunak fungsi dari **Carousel**

```javascript
render() {
return (
    <MapView>
    ...
    </MapView>
    <Carousel
        ref={c => {this._carousel = c;}}
        data={this.state.coordinates}
        renderItem={this.renderCoureselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        itemHeight={300}
        onSnapToItem={index => this.onCarouselChange(index)}
        containerCustomStyle={styles.carousel}
        removeClippedSubviews={false} />
}
```

#### Property yang kita pakai

disini tidak dibahas semuanya untuk lebih lanjut bisa kunjungi dokumentasinya

1. ref => property ini untuk mendefinisikan bahwa component tersebut pun bisa kita panggil di function lain dan kita modifikasi di function lain. untuk contohnya bisa dilihat nanti di bawah ini

2. renderItem => memiliki value berupa callback function yang parameternya diambil dari properti `data`

3. untuk yang lainnya bisa cek di dokumentasinya di [Dokumentasi props Carousel](https://github.com/meliorence/react-native-snap-carousel/blob/master/doc/PROPS_METHODS_AND_GETTERS.md)

#### function yang kita pakai

```javascript
renderCoureselItem({item}) {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitel}>{item.name}</Text>
        <Image source={item.image} style={styles.cardImage} />
      </View>
    );
  }
```

function ini yang nantinya kita pakai sebagai value dari `renderItem` yang parameternya dari props data seperti yang sudah dijelaskan di atas

```javascript
onCarouselChange = index => {
  let location = this.state.coordinates[index];
  // this._map merupakan property dari MapView, dengan property ref
  this._map.animateToRegion({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  this.state.marker[index].showCallout();
};
```

function ini nantinya bila kita geser maka `<MapView>` akan memposisikan seseuai dengan index dari `this.state.coordinates`. untuk parameternya sendiri, menyesuaikan index carousel

```javascript
onMarkPress = (location, index) => {
  this._map.animateToRegion({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  this._carousel.snapToItem(index);
};
```

function ini hampir sama dari function diatas yang bila mana kita tekan mark tersebut maka item carousel akan berpindah sesuai dengan mark tersebut. untuk paramternya sendiri dari `<Mark />` yang kita buat looping

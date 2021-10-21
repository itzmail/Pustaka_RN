## Instalasi React Nativ Maps

untuk instalasi berikut cuplikan dari beberap sumber yang aku cari

#### 1. Install package

`yarn add react-native-maps` atau `npm install react-native-maps --save-exact`

#### 2. Linking Library

sebenaranya pada step ini hanya dilakukuan untuk react native versi 0.59 ke bawah tetapi untuk versi diatasnya boleh melakukan _linking_ dengan cara

`npx react-native link react-native-maps`

#### 3. SetUp Permissions and something like this

- Specify your Google Maps API key:

Add your API key to your manifest file (android/app/src/main/AndroidManifest.xml):

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>

   <!-- You will also only need to add this uses-library tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>
</application>
```

> Note: As shown above, com.google.android.geo.API_KEY is the recommended metadata name for the API key. A key with this name can be used to authenticate to multiple Google Maps-based APIs on the Android platform, including the Google Maps Android API. For backwards compatibility, the API also supports the name com.google.android.maps.v2.API_KEY. This legacy name allows authentication to the Android Maps API v2 only. An application can specify only one of the API key metadata names. If both are specified, the API throws an exception.

Source: (https://developers.google.com/maps/documentation/android-api/signup)

- untuk mendapatkan API Key

kalian bisa cari di website [google console](https://console.cloud.google.com/)

`dashboard => di menu navigation (pilih credentials) => klik create credentials => pilih API key => salin API key di file AndroidManifest.xml`

- Tambahan saja

tambahkan code berikut di `android/settings.gradle`

```gradle
include ':react-native-maps'

project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')
```

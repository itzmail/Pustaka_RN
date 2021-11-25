## Instalation Library

1. Instal dulu via automatic

#### RN > 0.6

```bash
    npm install react-native-camera --save
    Run cd ios && pod install && cd ..
```

#### RN < 0.6

```bash
    npm install react-native-camera --save
    react-native link react-native-camera
```

2. Next Step

### Additional Required steps

Add permissions to your app `android/app/src/main/AndroidManifest.xml` file:

```xml
<!-- Required -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Include this only if you are planning to use the camera roll -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

<!-- Include this only if you are planning to use the microphone for video recording -->
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

Insert the following lines in `android/app/build.gradle`:

```gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' // <--- insert this line
  }
}
```

### Additional installation steps

### 1. Modifying build.gradle

Modify the following lines in `android/app/build.gradle`:

```gradle
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'mlkit' // <--- replace general with mlkit
  }
}
```

### 2. Setting up MLKit

#### If you don't use any other Firebase component in your project

1. Add the folowing to project level `android/build.gradle`:

```gradle
buildscript {
  dependencies {
  // Add this line
  classpath 'com.google.android.gms:strict-version-matcher-plugin:1.2.1' // <--- you might want to use different version
  }
}
```

2. taruh di bawah android/app/build.gradle

```gradle
apply plugin: 'com.google.android.gms.strict-version-matcher-plugin'
```

#### If you have Firebase integrated already

1. Add the folowing to project level `android/build.gradle`:

```gradle
buildscript {
  dependencies {
  // Add this line
  classpath 'com.google.gms:google-services:4.3.3'  // Google Services plugin(you might want to use different version)
  }
}
```

2. taruh di bawah android/app/build.gradle

```gradle
apply plugin: 'com.google.gms.google-services'  // Google Services plugin
```

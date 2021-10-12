import React from 'react';
import {Button, StyleSheet, View, Linking} from 'react-native';

/**
 * * Code di bawah ini dijalankan saat kita menggunakan lingking app. jadi aplikasi dibawah ini hanya sekedar contoh saja
 * untuk lebih lanjut bisa lihat video ini https://youtu.be/UwIzDBzaO3Q?t=255
 */

const showFeed = () => {
  Linking.openURL('recipes://feed');
};

const showDetail = () => {
  Linking.openURL('recipes://detail');
};

const showBottomTabs = () => {
  Linking.openURL('recipes://bottom_tabs');
};
const showTopTabs = () => {
  Linking.openURL('recipes://top_tabs');
};
const showNestedTopTab = tab => {
  Linking.openURL(`recipes://ttab${tab}`);
};

const App = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => showFeed()} title="Open feed" color="#2b1257" />
      <Button
        onPress={() => showDetail()}
        title="Open food Detail"
        color="#2b1257"
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
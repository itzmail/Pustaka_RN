import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from './styles/styles';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useNavigationState,
} from '@react-navigation/native';

/**
 * * useFocusedEffect(callback)
 * secara konsep sama seperti useEffect pada react hooks. tetapi bila kita menggunaka use focused effect setiap kita berpindah dari screen dan kembali lagi ke screen tersebut maka setiap perpindahan tersebut terjadi rendering.
 * ! Harus dibunggkus React.useCallback()
 *
 * * useNavigationState()
 * digunakan bila kita ingin menggunakan informasi navigasi (navigation state) ke user
 */

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const state = useNavigationState(state => state.index);

  const [user, setUser] = useState(null);

  /**
   * console.log(`screen index : ${state}`);
   * TODO Hasil yang muncul berupa informasi navigation. dalam kasus diatas akan menampilkan index screen
   * */

  // pakai .then .catch
  useFocusEffect(
    React.useCallback(() => {
      fetch(
        `https://restcountries.eu/rest/v2/capital/${route.params.countries}`,
      )
        .then(res => res.json())
        .then(res => {
          /* console.log(res); */
        })
        .catch(err => console.error(err));
      return () => console.log('Lost Focus');
    }, []),
  );

  // pakai try{} catch() {}
  /** 
   * ! Masih Error 
   *  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      let url = `https://restcountries.eu/rest/v2/capital/${route.params.countries}`;
      const fetchUser = async () => {
        try {
          const data = await fetch(url);
          if (isActive) {
            setUser(data);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchUser();
      return () => {
        isActive = false;
        console.log(user);
      };
    }),
  ); */

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{route.params.myParams}</Text>
      <Text>
        Judul diatas merupakan judul dinamis menggunakan lempar params
      </Text>
      <View style={styles.buttonNav}>
        <Button
          title="View Top Tabs"
          onPress={() =>
            navigation.navigate('TopTabs', {
              home: 'Home',
              message: 'Message',
              profile: 'Profile',
            })
          }
        />
      </View>
      <View style={styles.buttonNav}>
        <Button
          title="View Bottom Tabs"
          onPress={() => navigation.navigate('BottomTabs')}
        />
      </View>
      <View style={styles.buttonNav}>
        <Button
          title="Previous Screen"
          onPress={() => navigation.navigate('Home', {data: 'Hello User!'})}
        />
      </View>
    </View>
  );
};

export default Detail;
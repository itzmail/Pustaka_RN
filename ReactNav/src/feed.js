import React from 'react';
import {View, Text, Button, Switch} from 'react-native';
import {
  useNavigation,
  useRoute,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from 'react-native-appearance';

import {styles} from './styles/styles';

const Feed = () => {
  const navigation = useNavigation();
  const route = useRoute();

  let detailResult = route.params;
  return (
    <View style={styles.center}>
      <Text style={styles.title}>
        {detailResult ? detailResult.data : 'Navigaiton Drawer'}
      </Text>
      <Button
        title="Go to Feed item"
        onPress={() =>
          navigation.navigate('Detail', {
            myParams: 'My Detail Screen',
            countries: 'jakarta',
          })
        }
      />
    </View>
  );
};

export default Feed;
import React, {useState} from 'react';
import {View, Text, Switch} from 'react-native';

import Feed from './src/feed';
import Detail from './src/detail';

import Screen1 from './src/screens/drawer/screen1';
import Screen2 from './src/screens/drawer/screen2';
import Screen3 from './src/screens/drawer/screen3';

import Tab1 from './src/screens/tabs/Tab1';
import Tab2 from './src/screens/tabs/Tab2';
import Tab3 from './src/screens/tabs/Tab3';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  DrawerActions,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from 'react-native-appearance';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

const App = () => {
  let colorScheme = useColorScheme();
  const [dark, setDark] = useState(false);
  const toggleVision = () => setDark(!dark);

  const MyTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'purple',
      text: 'white',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  /**
   * * Linking
   * digunakan untuk menghubungkan antar app. jadi kita bisa mengirim data lewat lingking
   *
   * ? Untuk mengirim Param bisa dilihat properti FEED
   * setelah param tersebut masuk ke dalam state navigation berupa route
   *
   * untuk source codenya ada di cd ./src/otherApp/App.js
   */
  const linking = {
    prefixes: ['recipes://'],
    config: {
      screens: {
        Feed: 'feed/:title',
        Detail: 'detail',
        BottomTabs: {
          path: 'bottom_tabs',
          screens: {
            Tab1: {
              path: 'btab1',
              exact: true, // exact ini akan tidak memedulikan parents component
            },
            Tab2: {
              path: 'btab2',
              exact: true,
            },
            Tab3: {
              path: 'btab3',
              exact: true,
            },
          },
        },
        TopTabs: {
          path: 'top_tabs',
          screens: {
            Tab1: {
              path: 'ttab1',
              exact: true,
            },
            Tab2: {
              path: 'ttab1',
              exact: true,
            },
            Tab3: {
              path: 'ttab1',
              exact: true,
            },
          },
        },
        Favorites: 'favorites/:user/:id', // kita bisa mengirim lebih dari 2 parameter
        Contacts: 'contacts/:user?', // tanda ? digunakan sebagai parameter opsional
        Settings: {
          path: 'settings/:color/:age/:isVerified',
          parse: {
            // digunakan untuk mengubah format dari path, yang semulanya berupa string
            age: Number,
            isVerified: Boolean,
            themeColor: color => `color-${color}`,
          },
        },
      },
    },
  };

  const createHomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Feed"
          children={createDrawer}
          options={({navigation}) => ({
            title: 'React Navigation',
            headerLeft: () => (
              <Icon
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                style={[{color: 'white', marginLeft: 8}]}
                size={24}
                name={'menu'}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          /* options={{
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#1e96ee',
            },
          }} */
        />
        <Stack.Screen name="BottomTabs" children={createBottomTabs} />
        <Stack.Screen name="TopTabs" children={createTopTabs} />
      </Stack.Navigator>
    );
  };
  const createDrawer = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Feed} />
        <Drawer.Screen name="Contacts" component={Screen1} />
        <Drawer.Screen name="Favorites" component={Screen2} />
        <Drawer.Screen name="Settings" component={Screen3} />
      </Drawer.Navigator>
    );
  };

  const createBottomTabs = () => {
    return (
      <MaterialBottomTabs.Navigator>
        <MaterialBottomTabs.Screen
          name="Tab1"
          style={{marginBottom: 16}}
          component={Tab1}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <Icon style={[{color: 'white'}]} size={25} name={'home'} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="Tab2"
          component={Tab2}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => (
              <Icon style={[{color: 'white'}]} size={25} name={'human'} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="Tab3"
          component={Tab3}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: () => (
              <Icon style={[{color: 'white'}]} size={25} name={'map'} />
            ),
          }}
        />
      </MaterialBottomTabs.Navigator>
    );
  };

  const createTopTabs = props => {
    return (
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen
          name="Tab1"
          component={Tab1}
          options={{
            title: props.route.params.home,
          }}
        />
        <MaterialTopTabs.Screen
          name="Tab2"
          component={Tab2}
          options={{
            title: props.route.params.message,
          }}
        />
        <MaterialTopTabs.Screen
          name="Tab3"
          component={Tab3}
          options={{
            title: props.route.params.profile,
          }}
        />
      </MaterialTopTabs.Navigator>
    );
  };

  return (
    <AppearanceProvider>
      {/* 'appearanceProvider' digunakan saat kita mau menggunakan colorScheme */}
      <NavigationContainer
        theme={dark == true ? (colorScheme = MyTheme) : DefaultTheme}
        linking={linking}>
        {createHomeStack()}
      </NavigationContainer>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Dark/Ligth : </Text>
        <Switch
          onValueChange={() => {
            setDark(!dark);
          }}
          value={dark}
        />
      </View>
    </AppearanceProvider>
  );
};

export default App;
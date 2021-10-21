import React from 'react';
import {StyleSheet, Text, Image, Alert, Platform} from 'react-native';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Polygon,
  Circle
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions'

export default class ReactMaps extends React.Component {
  state = {
    initialPosition: null,
    latitude: 0,
    longitude: 0
  };

  showMesage() {
      return Alert.alert('Welcome', 'Hello user')
  }

  componentDidMount() {
    this.requestLocationPermission()
  }

  async requestLocationPermission() {
    if (Platform.OS === 'ios') {
      let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log(`iphone ${response}`)

      if(response === 'granted') {
        this.locateCurrentPosition()
      }
    } else {
      let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log(`android ${response}`)

      if(response === 'granted') {
        this.locateCurrentPosition()
      }
    }
  }

  locateCurrentPosition() {
    Geolocation.getCurrentPosition(
      // Success
      position => {
        console.log(JSON.stringify(position))

        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.035,
        }

        this.setState({initialPosition: region})
        this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
      },
      // Error
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    )
  }

  render() {
    console.log(this.state.initialPosition)
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => this._map = map}
        region={this.state.initialPosition}
        style={styles.map}>
        
        <Marker
          draggable
          coordinate={{latitude:this.state.latitude, longitude: this.state.longitude}}
          title={'San Francisco'}>
          
          <Callout onPress={() => this.showMesage()}>
            <Text>An intresting city</Text>
            <Image
              source={require('../assets/sushi.png')}
              style={{width: 50, height: 50}}
            />
          </Callout>
        </Marker>

      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

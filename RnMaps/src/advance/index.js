import React from 'react';
import {StyleSheet, Text, Image, Alert, Platform, View, Dimensions} from 'react-native';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';
import {PERMISSIONS, request} from 'react-native-permissions'

export default class ReactMaps extends React.Component {
  state = {
    initialPosition: null,
    latitude: 0,
    longitude: 0,
    coordinates: [
      {name: 'Tengkleng', latitude: 37.8025259, longitude: -122.4351431, image: require('../assets/food1.jpg')},
      {name: 'Sayur', latitude: 37.7896386, longitude: -122.421646, image: require('../assets/food2.jpg')},
      {name: 'Roti Bakar', latitude: 37.7665248, longitude: -122.44161628, image: require('../assets/food3.jpg')},
      // {name: '4', latitude: 37.7734153, longitude: -122.4577787},
      // {name: '5', latitude: 37.7948605, longitude: -122.4596065},
      // {name: '6', latitude: 37.8025259, longitude: -122.4351431},
    ],
    activeIndex: 0,
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

  renderCoureselItem({item}) {
    return(
      <View style={styles.cardContainer}>
      <Text style={styles.cardTitel}>{item.name}</Text>
      <Image source={item.image} style={styles.cardImage} />
    </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
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
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.coordinates}
        renderItem={this.renderCoureselItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        itemHeight={300}
        onSnapToItem = {index => this.setState({activeIndex: index})}
        containerCustomStyle={styles.carousel}
      />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  
  map: {
    ...StyleSheet.absoluteFillObject
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24
  },
  cardTitel: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  }
});

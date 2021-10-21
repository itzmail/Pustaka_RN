import React from 'react';
import {StyleSheet, Text, Image, Alert} from 'react-native';
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Polygon,
  Circle
} from 'react-native-maps';

export default class ReactMaps extends React.Component {
  state = {
    coordinates: [
      {name: '1', latitude: 37.8025259, longitude: -122.4351431},
      {name: '2', latitude: 37.7896386, longitude: -122.421646},
      {name: '3', latitude: 37.7665248, longitude: -122.44161628},
      {name: '4', latitude: 37.7734153, longitude: -122.4577787},
      {name: '5', latitude: 37.7948605, longitude: -122.4596065},
      {name: '6', latitude: 37.8025259, longitude: -122.4351431},
    ],
  };

  showMesage() {
      return Alert.alert('Welcome', 'Hello user')
  }

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.8025259,
          longitude: -122.4351431,
          latitudeDelta: 0.009,
          longitudeDelta: 0.035,
        }}
        style={styles.map}>
        <Circle 
            center={{latitude: 37.8025259, longitude: -122.4351431}}
            radius={1000}
        />
        <Polygon
          coordinates={this.state.coordinates}
          fillColor={'rgba(100, 300, 100, 0.5)'}
          strokeWidth={2} />
        <Marker
          draggable
          coordinate={{latitude: 37.8025259, longitude: -122.4351431}}
          title={'San Francisco'}>
          <Image
            source={require('../assets/sushi.png')}
            style={{width: 50, height: 50}}
          />
          <Callout onPress={() => this.showMesage()}>
            <Text>An intresting city</Text>
            <Image
              source={require('../assets/sushi.png')}
              style={{width: 50, height: 50}}
            />
          </Callout>
        </Marker>

        {/* Make Looping */}
        {this.state.coordinates.map(marker => {
            return (
                <Marker key={marker.name} coordinate={{latitude: marker.latitude, longitude: marker.longitude}}></Marker>
            )
        })}

      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
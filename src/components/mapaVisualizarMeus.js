import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView,{Marker} from 'react-native-maps'

const dados = require('./meusEventos');

export default class mapaVisualizar extends Component {
  constructor(){
    super()
    this.state = {
      longitude: dados.dados.longitude,
      latitude: dados.dados.latitude,
      key: 0,
      color: '#1e90ff',
      endereco: null,
      region: {
        latitude: dados.dados.latitude,
        longitude: dados.dados.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0143,
      },
    }
  }

  render() {
    return (

      <View style={styles.container}>

  
        <MapView
          loadingEnabled={true}
          style={styles.map}
          initialRegion={this.state.region}>
        <Marker
          key={this.state.key}
          coordinate={{longitude: this.state.longitude, latitude: this.state.latitude}}
          pinColor={this.state.color}/>
        </MapView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  
  container: {
  
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },

  map: {

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },

});
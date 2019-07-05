import React, { Component } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps'
import { showLocation, Popup } from 'react-native-map-link'
import { Icon, Text } from 'react-native-elements';

const dados = require('./Home');

export default class mapaVisualizar extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: true,

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
  componentDidMount() {
    //this.link()
    // this.props.navigation.navigate('VisualizarEventoFromHome')
  }

  link() {


    showLocation({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      //  sourceLatitude: -24.043460,
      //  sourceLongitude: -52.377804,
      alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
      dialogTitle: 'Abrir com...', // optional (default: 'Open in Maps')
      dialogMessage: 'Selecione um aplicativo para continuar', // optional (default: 'What app would you like to use?')

      appsWhiteList: ['google-maps', 'uber', 'waze'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
      cancelText: 'Cancelar' // optional (default: 'Cancel')
    })
  }

  render() {
    return (

      <View style={styles.containerPrincipal}>
        <Popup
          isVisible={this.state.isVisible}
          onCancelPressed={() => {this.setState({ isVisible: false }); this.props.navigation.navigate('VisualizarEventoFromHome')}}
          onAppPressed={() => {this.setState({ isVisible: false }); this.props.navigation.navigate('VisualizarEventoFromHome')}}
          onBackButtonPressed={() => {this.setState({ isVisible: false });;this.props.navigation.navigate('VisualizarEventoFromHome')}}
          modalProps={{ // you can put all react-native-modal props inside.
            animationIn: 'slideInUp'
          }}
          
          appsWhiteList={[ 'google-maps', 'uber', 'waze']}
          options={{ latitude: this.state.latitude,
            longitude: this.state.longitude/* See `showLocation` method above, this accepts the same options. */ }}
          style={{ /* Optional: you can override default style by passing your values. */ }}
        />
        <ActivityIndicator size="large" color="#FFF"/>

        {/*   
        <MapView
          loadingEnabled={true}
          style={styles.map}
          initialRegion={this.state.region}>
        <Marker
          key={this.state.key}
          coordinate={{longitude: this.state.longitude, latitude: this.state.latitude}}
          pinColor={this.state.color}/>
        </MapView> */}

      </View>

    );
  }
}

const styles = StyleSheet.create({

  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
  },

  // container: {

  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   alignItems: 'flex-end',

  // },

  // map: {

  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,

  // },

});
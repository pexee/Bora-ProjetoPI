import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView,{Marker} from 'react-native-maps'


export default class mapaCriarEvento extends Component {
  constructor(){
    super()
    this.state = {
      longitude: -52.378963,
      latitude: -24.042046,
      key: 0,
      color: '#1e90ff',
      endereco: null,
      region: {
        latitude: -24.042046,
        longitude: -52.378963,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0143,
      },
    }
  }

onMapPress(e) {
    this.setState({
      longitude: e.nativeEvent.coordinate.longitude,
      latitude: e.nativeEvent.coordinate.latitude,
    });
    this.getEndereco();
  }

  getEndereco(){
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    Alert.alert(
    "Bora?",
    "Deseja Mudar?",
    [
        { text: "Não", onPress: () => null },
        { text: "Sim", onPress: () => {
          module.exports.local = {latitude: this.state.latitude, longitude: this.state.longitude};
          this.props.navigation.navigate('CadastroEventoPage6');} }
    ],);
  }

  teste(){
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    Geocoder.from(this.state.latitude, this.state.longitude).then(json => {
      console.log(json);
    }).catch(error => {
      console.log(error);
    });
    Alert.alert(
    "Bora?",
    this.state.endereco,
    "Deseja Mudar?"
    [
        { text: "Não", onPress: () => null },
        { text: "Sim", onPress: () => null }
    ],);
  }

  render() {
    return (

      <View style={styles.container}>

  
        <MapView
          loadingEnabled={true}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={e => this.onMapPress(e)}>
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
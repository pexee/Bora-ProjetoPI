import React, {Component} from 'react';
import {Platform, TouchableOpacity, Switch, StyleSheet, View, Alert, ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, Text, Icon} from 'react-native-elements';
import {Left, Body, Header, Title } from 'native-base';
import cep from 'cep-promise';
import Geocoder from 'react-native-geocoding';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import firebase from 'react-native-firebase';


const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

const dados = require('./eventosConfirmados');

Geocoder.init("AIzaSyDGsc2c_hhwujrjwu30BeOfw3Oh9dgNqJQ", {language : "pt-br"});

const theme = {
  colors: {
    primary: 'black'
  }
}

const themeButton = {
  colors: {
    primary: '#1e90ff'
  }
}


export default class cadastroEventoPage5 extends React.Component<Props>{
  constructor(props) {
    super(props);
    this.state = {
      endereco: null,
      latitude: null,
      longitude: null,
      cep: null,
      num: null,
      Component: null,
      useGoogleMaps: ANDROID,
    };
  }

    async enderecoByCep(){
      await cep(this.state.cep).then(address => {
        this.setState({endereco: address});
      }).catch(error => {
        this.setState({endereco: null});
        alert('Erro, CEP Invalido');
      });
      this.verificaEndereco();
      }

    verificaEndereco(){
        if(this.state.endereco != null){
          const addressComplet = this.state.endereco.street + ',' + this.state.num
          + '-' + this.state.endereco.neighborhood + ',' + this.state.endereco.city + '-' + this.state.endereco.state;
        Geocoder.from(addressComplet).then(json => {
          this.setState({
            latitude: json.results[0].geometry.location.lat,
            longitude: json.results[0].geometry.location.lng,
            endereco: json.results[0].formatted_address,
          });
          this.confirmaEndereco();
        }).catch(error => {
          console.log(error);
        });
      }
      }

      confirmaEndereco(){
        Alert.alert(
          "Bora?",
          "O endereço: " + this.state.endereco + ", está correto?",
          [
            { text: "Não", onPress: () =>  null },
            { text: "Sim", onPress: () =>  this.alterarEndereco() }
          ],);
    }

   async alterarEndereco(){
    await firebase.database().ref('/eventos/' + dados.dados.key).update({
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      endereco: this.state.endereco,
    });
    this.props.navigation.navigate('Home');
  }


  render() {
    return (
    <View style={styles.container}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.props.navigation.navigate('VisualizarEventoFromHome')} hasTabs/>
            </Left>
            <Body>
            <Title> Editar endereço </Title>
            </Body>
          </Header>
        <ScrollView>
        <View style={styles.icon}>
        <Icon name='map-marker' type='font-awesome' size={120} color={"#1e90ff"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: '#1e90ff' }}>
            Indique o novo local do seu evento
          </Text>
        </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input placeholder={'CEP'} underlineColorAndroid='transparent' placeholderTextColor='#808080' onChangeText={(cep) => this.setState({ cep})}/> 
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input placeholder={'Numero'} underlineColorAndroid='transparent' placeholderTextColor='#808080' onChangeText={(num) => this.setState({ num})}/> 
            </View>
          </View>
            <View style={styles.text}>
            <Text style={{textDecorationLine: 'underline'}} onPress={() => {
            this.props.navigation.navigate('MapaEditarConfirmados');}}>
            Ou indique o local no mapa
          </Text>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
          <Button onPress={() => this.enderecoByCep()} buttonStyle={{width: 60, height: 45}} icon={<Icon name='check' type='material' size={20} color="white" />} />
        </ThemeProvider>
        </View>
        </ScrollView>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  input: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 50,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: { 
    fontWeight: 'bold', 
    fontSize: 30,
  },
  text: {
    marginTop: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header:{
    backgroundColor: '#1e90ff'
  },
  inputContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
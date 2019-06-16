import React, {Component} from 'react';
import {Platform, TouchableOpacity, Switch, StyleSheet, View, Alert, ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Left, Body, Header, Title } from 'native-base';
import cep from 'cep-promise';
import Geocoder from 'react-native-geocoding';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

Geocoder.init("AIzaSyDGsc2c_hhwujrjwu30BeOfw3Oh9dgNqJQ", {language : "pt-br"}); // set the language

var dados = null;
const theme = {
  colors: {
    primary: 'black'
  }
}

const themeButton = {
  colors: {
    primary: 'white'
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

    alert(){
      Alert.alert(
          "Deseja retornar a Home?",
          "Todo seu progresso de criação de evento sera perdido",
          [
              { text: "Não", onPress: () =>  null },
              { text: "Sim", onPress: () => this.props.navigation.navigate('Home')},
              
          ],);
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
            { text: "Sim", onPress: () =>  {
              module.exports.endereco = {endereco: this.state.endereco, latitude: this.state.latitude, longitude: this.state.longitude};
              this.props.navigation.navigate('CadastroEventoPage6');
            } }
          ],);
    }

   


  render() {
    return (
    <View style={styles.container}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.alert()} hasTabs/>
            </Left>
            <Body>
            <Title> Criar Evento </Title>
            </Body>
          </Header>
        <View style={styles.icon}>
        <Icon name='map-marker' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Qual o local do seu evento?
          </Text>
        </View>
          <View style={styles.input}> 
          <Input placeholder={'CEP'} underlineColorAndroid='transparent' placeholderTextColor='white' onChangeText={(cep) => this.setState({ cep})}/>
          <Input placeholder={'Nº'} underlineColorAndroid='transparent' placeholderTextColor='white' onChangeText={(num) => this.setState({ num})}/>
          </View>
            <View style={styles.text}>
          <Text style={{color: 'white', textDecorationLine: 'underline'}} onPress={() => {
            module.exports.endereco = null;
            this.props.navigation.navigate('MapaCriarEvento');}}>
            Ou indique o local no mapa
          </Text>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={ ()=> this.enderecoByCep()} titleStyle={{ color: 'black' }}/>
        </ThemeProvider>
        </View>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  input: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginTop: 20,
    paddingLeft: 70,
    paddingRight: 70,
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
    marginTop: 40,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header:{
    backgroundColor: '#1e90ff'
  }
});
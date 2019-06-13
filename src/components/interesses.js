import React, {Component} from 'react';
import {StyleSheet, ScrollView, Alert, View, Dimensions, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider, Text, CheckBox} from 'react-native-elements';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title } from 'native-base'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Home'

var {height, width} = Dimensions.get('window');

const user = require('./Home');

const theme = {
    colors: {
      primary: 'white'
    }
  }

export default class interesses extends Component{

    state = {

    } 

    constructor(){
      super()
      this.state = {
        rock: false,
        sertanejo: false,
        pagode: false,
        samba: false,
        eletro: false,
        funk: false,
      }
      this.verificaInteresses();
  }

  async verificaInteresses(){
      await firebase.database().ref('/usuarios/' + user.user + '/interesses/').once('value').then(snapshot => {
        if(snapshot.val() != null){
          this.setSta({
            rock: snapshot.val().rock,
            sertanejo: snapshot.val().sertanejo,
            pagode: snapshot.val().pagode,
            samba: snapshot.val().samba,
            eletro: snapshot.val().eletro,
            funk: snapshot.val().funk,
          })
        }
        else{
          firebase.database().ref('/usuarios/' + user.user + '/interesses/').update({
            rock: false,
            sertanejo: false,
            pagode: false,
            samba: false,
            eletro: false,
            funk: false,
          });
        }
      });
    }

    async atualizaInteresses(){
      await firebase.database().ref('/usuarios/' + user.user + '/interesses/').update({
        rock: this.state.rock,
        sertanejo: this.state.sertanejo,
        pagode: this.state.pagode,
        samba: this.state.samba,
        eletro: this.state.eletro,
        funk: this.state.funk,
      });
      Alert.alert(
                "Bora?",
                "Interesses atualizados, bora!",
                [
                    { text: "OK", onPress: () =>  null },
                ],);
      this.props.navigation.navigate('Home');
    }
 
 switchRock = (value) => {
    this.setState({rock: value})
 }
 switchSertanejo = (value) => {
    this.setState({sertanejo: value})
 }
 switchPagode = (value) => {
    this.setState({pagode: value})
 }
 switchSamba = (value) => {
    this.setState({samba: value})
 }
 switchEletro = (value) => {
    this.setState({eletro: value})
 }
 switchFunk = (value) => {
    this.setState({funk: value})
 }
 

  render() {
    return (
        <View style={styles.containerPrincipal}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.props.navigation.navigate('Home')} hasTabs/>
            </Left>
            <Body>
            <Title> Interesses </Title>
            </Body>
          </Header>
            <View style={styles.containerCheckBox}>
              <ScrollView>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Rock </Text>
                  <Switch onValueChange = {this.switchRock} trackColor = {{false: '#C0C0C0', true: '#00FF00'}} thumbColor = {'#C0C0C0'} value = {this.state.rock}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Sertanejo </Text>
                  <Switch onValueChange = {this.switchSertanejo} trackColor = {{false: '#C0C0C0', true: '#00FF00'}} thumbColor = {'#C0C0C0'} value = {this.state.sertanejo}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Pagode </Text>
                  <Switch onValueChange = {this.switchPagode} trackColor = {{false: '#C0C0C0', true: '#00FF00'}} thumbColor = {'#C0C0C0'} value = {this.state.pagode}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Samba </Text>
                  <Switch onValueChange = {this.switchSamba} trackColor = {{false: '#C0C0C0', true: '#00FF00'}} thumbColor = {'#C0C0C0'} value = {this.state.samba}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Eletro </Text>
                  <Switch onValueChange = {this.switchEletro} trackColor = {{false: '#C0C0C0', true: '#00FF00'}} thumbColor = {'#C0C0C0'} value = {this.state.eletro}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Funk </Text>
                  <Switch onValueChange = {this.switchFunk} trackColor = {{false: '#C0C0C0', true: '#00FF00'}} thumbColor = {'#C0C0C0'} value = {this.state.funk}/>
                </View>

              </ScrollView>
            </View>
            <View style={styles.button}>
                <ThemeProvider theme={theme}>
            <Button raised title='Confirmar' onPress={() => this.atualizaInteresses()} titleStyle={{ color: 'black' }}/>
            </ThemeProvider>
      </View>
      </View>
  );
  }
}



const styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor: '#1e90ff',
    },
    containerCheckBox: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 380,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    header:{
        backgroundColor: '#1e90ff'
    },
    button: {
        marginTop: 10,
        paddingLeft: 70,
        paddingRight: 70,
      },
    sw : {
      marginTop: 10,
      height: 40,
      width: (width-(width*0.2)),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 15
    },
    txt: {
      color: 'white', 
      paddingLeft: 10
    }
  });
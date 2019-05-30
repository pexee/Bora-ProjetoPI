import React, {Component} from 'react';
import {StyleSheet, View, Alert, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { Text} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import firebase from 'react-native-firebase';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import EditarEvento from './editarEvento';
import {Left, Body, Right} from 'native-base'


export default class eventosConfirmados extends Component{  
  render() {
    return (
        <View style={styles.containerPrincipal}>
            <Text> TESTE</Text>
        </View>
  );
  }
}




const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
    },
    image: {
        width: 380,
        height: 180,
    },
    logoContainer: {
        alignItems: 'center',
    },
    nome: {
        backgroundColor: '#1e90ff',
        height: 40, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center', 
    },  
    desc: {
        backgroundColor: '#1e90ff',
        height: 80, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    horario: {
        backgroundColor: '#fff',
        height: 70, 
        color: '#fff',
        //borderWidth: 1,
        //borderColor: '#000000',
        flexDirection: 'row'
    },
    iconCalendar: {
        marginTop: 10,
        paddingLeft: 30,
        justifyContent: 'center',
        
    },
    actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
    iconClock: {
        marginTop: 10,
        paddingLeft: 60,
        justifyContent: 'center',
    },
    local: {
        backgroundColor: '#fff',
        height: 80, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        //borderColor: '#000000', 
    },
    header:{
      backgroundColor: '#1e90ff'
    },
    confirmButton: {
      marginTop: 10,
      paddingLeft: 40,
      justifyContent: 'center',
    },
    roundButton: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width: 40,
      height: 40,
      backgroundColor:'#fff',
      borderRadius: 50,
    },
    buttonLeft : {
      paddingLeft: 14,
      justifyContent: 'center',
    },
    buttonLeft2 : {
      paddingLeft: 20,
      justifyContent: 'center',
    }
  });
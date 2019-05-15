import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider, Header, CheckBox, Text} from 'react-native-elements';

const theme = {
    colors: {
      primary: 'white'
    }
  }

export default class App extends Component{  
  render() {
    return (
        <View style={styles.containerPrincipal}>
            <View style={styles.logoContainer}>
                <Image style={styles.image} source={require('../images/teste.png')}/>
            </View>
            <View style={styles.nome}>
                <Text h4 style={{color: 'white'}}>   Engenhariadas Paranaense</Text>
            </View>
            <View style={styles.horario}>
                <Text>asdsadsa</Text>
                <Icon name='map-marker' size={24} color='black'/>
            </View>
            <View style={styles.desc}>
                <Text style={{color:'white'}}>Esse evento ira ocorrer em Umuarama, 3 festas open bar, loucura total melhor festas de todas</Text>
            </View>
        </View>
  );
  }
}


const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
        backgroundColor: '#fff',
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
        height: 60, 
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
        height: 60, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth: 1,
        borderColor: '#1e90ff',
    },  
  });
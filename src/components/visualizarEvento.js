import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider, Header, CheckBox, Text} from 'react-native-elements';

const dados = require('./Home');

const theme = {
    colors: {
      primary: 'white'
    }
  }

export default class App extends Component{  
  render() {
    return (
        <View style={styles.containerPrincipal}>
                <Image source={{uri: dados.dados.imageUrl}} style={{height: 180,width: null, flex: 1}}/>
            <View style={styles.nome}>
                <Text h4 style={{color: 'white'}}>  {dados.dados.nome}</Text>
            </View>
            <View style={styles.horario}>
                <View style={styles.iconCalendar}>
                    <Icon name='calendar' size={24} color='#1e90ff'/>
                    <Text> {dados.dados.data} </Text>
                </View>
                <View style={styles.iconClock}>
                    <Icon name='adjust' size={24} color='#1e90ff'/>
                    <Text> {dados.dados.horario} </Text>
                </View>
            </View>
            <View style={styles.desc}>
                <Text style={{color:'white'}}> {dados.dados.descrição} </Text>
            </View>
            <View style={styles.local}>
                <Icon name='map-marker' size={24} color='#1e90ff'/>
                <Text>Rua das Drogas</Text>
            </View>
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
        borderWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row'
    },
    iconCalendar: {
        marginTop: 10,
        paddingLeft: 90,
        
    },
    iconClock: {
        marginTop: 10,
        paddingLeft: 125,
    },
    local: {
        backgroundColor: '#fff',
        height: 80, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#000000', 
    },
  });
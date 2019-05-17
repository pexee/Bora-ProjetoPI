import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Image, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';
import { Input, Button, ThemeProvider, Header, CheckBox, Text} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import firebase from 'react-native-firebase';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import EditarEvento from './editarEvento'



const dados = require('./Home');

const theme = {
    colors: {
      primary: 'white'
    }
  }
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

class visualizarEvento extends Component{  

    async isProprietario(){
        const user = await firebase.auth().currentUser;
        if(user.uid == dados.dados.proprietario){
            return true;
        }
        return false;
    }

    putButton(){
        return <ActionButton buttonColor='#00bfff'>
          <ActionButton.Item buttonColor='#90ee90' title="Editar" onPress={() => this.props.navigation.navigate('editarEvento')}>
            <Icon type='material' name="edit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='red' title="Excluir" onPress={() => {}}>
            <Icon name="close" type='material' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

    }

  render() {
    return (
        <View style={styles.containerPrincipal}>
                <Image source={{uri: dados.dados.imageUrl}} style={{height: 180,width: null, flex: 1}}/>
            <View style={styles.nome}>
                <Text h4 style={{color: 'white'}}>  {dados.dados.nome}</Text>
            </View>
            <View style={styles.horario}>
                <View style={styles.iconCalendar}>
                    <Icon name='event' type='material' size={24} color='#1e90ff'/>
                    <Text> {dados.dados.data} </Text>
                </View>
                <View style={styles.iconClock}>
                    <Icon name='alarm' type='material' size={24} color='#1e90ff'/>
                    <Text> {dados.dados.horario} </Text>
                </View>
            </View>
            <View style={styles.desc}>
                <Text style={{color:'white'}}> {dados.dados.descrição} </Text>
            </View>
            <View style={styles.local}>
                <Icon name='map-marker' type='font-awesome' size={24} color='#1e90ff'/>
                <Text> {dados.dados.endereco} </Text>
            </View>
                {this.isProprietario() ? this.putButton() : null}
        </View>
  );
  }
}

class editarEvento extends Component {
  render(){
      return (
          <EditarEvento/>
      );
  }
}

const AppSwitchNavigator = createStackNavigator({
  visualizarEvento: {screen: visualizarEvento,
    navigationOptions: {
      header: null,
    },
  },
  editarEvento: {screen: editarEvento,
    navigationOptions: {
      header: null,
    },
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

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
        height: 60, 
        color: '#fff',
        borderWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row'
    },
    iconCalendar: {
        marginTop: 10,
        paddingLeft: 70,
        justifyContent: 'center',
        
    },
    actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
    iconClock: {
        marginTop: 10,
        paddingLeft: 80,
        justifyContent: 'center',
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
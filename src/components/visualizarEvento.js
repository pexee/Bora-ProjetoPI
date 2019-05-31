import React, {Component} from 'react';
import {StyleSheet, View, Alert, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { Text} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import firebase from 'react-native-firebase';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import EditarEvento from './editarEvento';
import Home from './Home';
import {Left, Body, Right} from 'native-base'


const fromHome = require('./Home');
const fromMeusEventos = require('./meusEventos');
var dados = null;
const storage = firebase.storage();


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

    state = {

    }

    constructor(){
        super()
        if(home){
          dados = fromHome;
        }
        else{
          dados = fromMeusEventos;
        }
        if(dados.user == dados.dados.proprietario){
            this.state = {
                user: dados.user,
                proprietario: dados.dados.proprietario,
                isProprietario: true,
            }
        }
        else{
            this.state = {
                user: dados.user,
                proprietario: dados.dados.proprietario,
                isProprietario: false,
            }
        }
        console.log(this.state.isProprietario);
    }

    putButton(){
        return <ActionButton buttonColor='#00bfff'>
          <ActionButton.Item buttonColor='#90ee90' title="Editar" onPress={() => this.props.navigation.navigate('editarEvento')}>
            <Icon type='material' name="edit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='red' title="Excluir" onPress={() => this.alert()}>
            <Icon name="close" type='material' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

    }

    alert(){
            Alert.alert(
                "Excluir Evento",
                "Deseja EXCLUIR o evento?",
                [
                    { text: "Não", onPress: () =>  null },
                    { text: "Sim", onPress: () => this.excluirEvento()},
                ],);
    }

    async excluirEvento(){
        var imageRef = storage.ref('eventos').child(dados.dados.key);
        await imageRef.delete();
        await firebase.database().ref('/eventos/'+dados.dados.key).remove();
        this.props.navigation.navigate('home');
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
                  <View style={styles.buttonLeft2}>
                  <TouchableOpacity style={styles.roundButton}>
                    <Icon name='event' type='material' size={24} color='#1e90ff'/>
                  </TouchableOpacity>
                    </View>
                    <Text> {dados.dados.data} </Text>
                </View>
                <View style={styles.confirmButton}>
                    <View style={styles.buttonLeft}>
                    <TouchableOpacity style={styles.roundButton}>
                      <Icon name='done' type='material' size={24} color='#1e90ff' onPress={() => {Alert.alert('You tapped the button!')}} /> 
                    </TouchableOpacity>
                    </View>
                  <Text> Confirmar </Text>
                </View>
                <View style={styles.iconClock}>
                    <TouchableOpacity style={styles.roundButton}>
                      <Icon name='alarm' type='material' size={24} color='#1e90ff'/>
                    </TouchableOpacity>
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
                {this.state.isProprietario ? this.putButton() : null}
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

class home extends Component {
  render(){
      return (
          <Home/>
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
  },
  home: {screen: home,
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
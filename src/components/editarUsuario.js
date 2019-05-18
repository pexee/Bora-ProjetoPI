import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider} from 'react-native-elements';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title } from 'native-base'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Home'

const theme = {
  colors: {
    primary: 'white'
  }
}
const user = firebase.auth().currentUser;


export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}


class editarUsuario extends Component{
  state = {
    nome: '',
    email: '',
    password: '',
    password2: '',
    isAuthenticated: false,
    
  };
  
  componentDidMount(){
    console.log(user);
    this.setState({nome: user.displayName, email: user.email});
  }
  

  editarconta = async () => {
    const { nome, email, password } = this.state;
    var database = firebase.database();

     
    try {
     
      if (user) {
        user.updateProfile({
          displayName: nome
        })
        
        firebase.database().ref('/usuarios/'+user.uid).set({
          displayName: nome,
          emaill : user.email,
          uid: user.uid
        })

      } else {
        console.log('user vazio')
      }
      
    } catch (error) {
      console.log('atualizaçao nao deu bom')
    }
    
  }
  
  
  render() {
    return (
        <View style={styles.containerPrincipal}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.props.navigation.navigate('home')} hasTabs/>
            </Left>
            <Body>
            <Title> Editar informações </Title>
            </Body>
          </Header>
        <View style={styles.containerInput}>
          <ScrollView>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='Nome' leftIcon={
              <Icon name='user' size={24} color='white'/>}
              value={this.state.nome}
              onChangeText={nome => this.setState({ nome })}
              />
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Email'  leftIcon={
              <Icon name='user' size={24} color='white'/>}
              value={this.state.email}
              //onChangeText={nome => this.setState({ nome })}
              />
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Digite sua senha novamente' secureTextEntry={true} leftIcon={
              <Icon name='lock' size={24} color='white'/>}/>
            </View>
          </ScrollView>
          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button raised title='Confirmar' onPress={() => {this.editarconta(); this.props.navigation.navigate('home')}} titleStyle={{ color: 'black' }}/>
            </ThemeProvider>
          </View>
        </View>
      </View>
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
  editarUsuario: {screen: editarUsuario,
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
      backgroundColor: '#1e90ff',
    },
    containerInput: {
      marginTop: 60,
      paddingLeft: 20,
      paddingRight: 20,
    },
    input: {
      marginTop: 10,
      borderRadius:15,
      backgroundColor: '#00bfff',
    },
    button: {
      marginTop: 10,
      paddingLeft: 70,
      paddingRight: 70,
    },
    header:{
      backgroundColor: '#1e90ff'
    }
  });
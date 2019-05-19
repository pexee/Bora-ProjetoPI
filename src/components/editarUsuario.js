import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider} from 'react-native-elements';
import firebase from 'react-native-firebase';

const theme = {
  colors: {
    primary: 'white'
  }
}
const user = firebase.auth().currentUser;
export default class App extends Component{
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
        alert( 'alterado com sucesso')

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
              <Button raised title='Confirmar' onPress={this.editarconta} titleStyle={{ color: 'black' }}/>
            </ThemeProvider>
          </View>
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
  });
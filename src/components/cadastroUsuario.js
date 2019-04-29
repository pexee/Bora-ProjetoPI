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

export default class App extends Component{

  state = {
    nome: 'geovani',
    email: 'geovanipedroso01@hotmail.com',
    password: '',
    password2: '',
    isAuthenticated: false,
  };

  criarconta = async () => {
    const { nome, email, password } = this.state;
    var database = firebase.database();

     
    try {
      if(this.state.password.length < 6){
        alert('senha deve conter 6 ou mais caracteres')
        return;
      }
      
      if(this.state.password.localeCompare(this.state.password2)){
        alert('senhas diferentes')
        return;

      }
      

      await firebase.auth().createUserWithEmailAndPassword(email, password);
      //firebase.auth().signInWithEmailAndPassword(email, password);
      const user = await firebase.auth().currentUser;
      if (user) {
        firebase.database().ref('/usuarios/'+user.uid).set({
          name: nome,
          emaill : user.email,
          uid: user.uid
        });  
      } else {
        // No user is signed in.
      }
      
        
        

      
      
    
    this.setState({ isAuthenticated: true });
      
      
    } catch (error) {
      
    }
    
  }
  
  render() {
    return (
      <View style={styles.containerPrincipal}>
        {this.state.isAuthenticated ? alert( 'Criado com sucesso'): null }
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
              <Input placeholderTextColor='#fff' placeholder='E-mail' leftIcon={
              <Icon name='at' size={24} color='white'/>}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Senha' secureTextEntry={true} leftIcon={
              <Icon name='lock' size={24} color='white'/>}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Digite sua senha novamente' secureTextEntry={true} leftIcon={
              <Icon name='lock' size={24} color='white'/>}
              value={this.state.password2}
              onChangeText={password2 => this.setState({ password2 })}
              />
            </View>
          </ScrollView>
          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button raised title='Confirmar' onPress={this.criarconta} titleStyle={{ color: 'black' }}/>
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

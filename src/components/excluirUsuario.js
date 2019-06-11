import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider} from 'react-native-elements';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title,Text } from 'native-base'

const theme = {
  colors: {
    primary: 'white'
  }
}



export default class excluirUsuario extends Component{
  state = {
    nome: '',
    email: '',
    password: '',
    password2: '',
    isAuthenticated: false,
    
  };
  
  componentDidMount(){
    console.log('\n\n didmount \n\n');
    const user = firebase.auth().currentUser;
    this.setState({nome: user.displayName});
    
  }
  reauthenticate = (senhaAtual) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
    return user.reauthenticateWithCredential(cred);
  }

  apagarConta() {
    const { nome, email, password } = this.state;
    

     
    try {
      if(this.state.password.length < 6){
        alert('Digite sua senha')
        return;
      }
      
      if(this.state.password.localeCompare(this.state.password2)){
        alert('senhas diferentes')
        return;

      }

      this.reauthenticate(password).then( function() {

        var user = firebase.auth().currentUser;

        user.delete().then(function() {

          firebase.database().ref('/usuarios/'+user.uid).remove().then(function() {
            console.log('\n excluido do banco')

          }).catch(function (error){
            console.log('\n nao excluido do banco')
          })
          console.log('\n Conta excluida \n')

          alert('Conta Excluida ')

        }).catch(function(error) {
          console.log('\n nao excluiu ')
          return
        })
      }).catch(function(error){
        console.log('erro no reauthentication\n')
        console.log(error)
        alert('Senha Incorreta')
        return
      })

      
    } catch (error) {
      
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
            <Title> Excluir Conta </Title>
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
          <Text style={{fontWeight: 'normal', color:'red'}}> *Digite sua senha para confirmar </Text>
         
          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button raised title='Confirmar' onPress={() => {this.apagarConta() }} titleStyle={{ color: 'black' }}/>
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
  header:{
    backgroundColor: '#1e90ff'
  }
});
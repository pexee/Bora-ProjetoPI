import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider} from 'react-native-elements';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title,Text } from 'native-base'
import { functionTypeAnnotation } from '@babel/types';

const theme = {
  colors: {
    primary: 'white'
  }
}



export default class excluirUsuario extends Component{
  state = {
    nome: '',
    email: '',
    novoEmail: '',
    novoEmail2: '',
    password: '',



  };

  componentDidMount(){
    console.log('\n\n didmount \n\n');
    const user = firebase.auth().currentUser;
    this.setState({email: user.email});

  }


  reauthenticate = (senhaAtual) => {


    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
    console.log('\n\n email reauthenticate: '+ user.email)
    console.log('\n\n Senha reauthenticate:  '+ senhaAtual)

    return user.reauthenticateWithCredential(cred);
  }


  async changeEmail(){
    const { nome, email, password, novoEmail, novoEmail2 } = this.state;
    console.log('\n\n comecou \n\n')
    
      
    if(this.state.password.length < 6){
      alert('Digite sua senha')
        return;
    }
    if(this.state.novoEmail.length<1){
      alert('Digite o novo Email')
      return
    }

    if(this.state.novoEmail.localeCompare(this.state.novoEmail2)){
      alert('E-mails diferentes')
      return;

    }

    try {

      await this.reauthenticate(password)
        
    } catch (error) {
      console.log('nao deu')
      alert('Senha Incorreta')
      return

    }

    var user = firebase.auth().currentUser;

    user.updateEmail(novoEmail).then(function(){

      firebase.database().ref('/usuarios/'+user.uid).update({
        emaill: novoEmail

      }).then(function(){
        console.log('\n\n email atualizado no banco\n\n')
      }).catch(function(error){
        console.log('\n\n email nao atualizado no banco\n\n')
      })  
      console.log('\n\n email atualizado no User\n\n')
            
      
    })
    alert('Email Atualizado')
    this.props.navigation.navigate('EditarUsuario')

}

  alert(){
    Alert.alert(
        "Alterar Email",
        "Deseja realmente alterar seu email?",
        [
            { text: "Não", onPress: () =>  null },
            { text: "Sim", onPress: () => this.changeEmail()},
            
        ],);
  }


  render() {
    return (
      <View style={styles.containerPrincipal}>      
        <View style={styles.containerInput}>
          <ScrollView>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='E-mail' leftIcon={
              <Icon name='at' size={24} color='white'/>}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='Digite o novo E-mail' leftIcon={
              <Icon name='at' size={24} color='white'/>}
              value={this.state.novoEmail}
              onChangeText={novoEmail => this.setState({ novoEmail })}
              />
            </View>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='Digite o novo E-mail novamente' leftIcon={
              <Icon name='at' size={24} color='white'/>}
              value={this.state.novoEmail2}
              onChangeText={novoEmail2 => this.setState({ novoEmail2 })}
              />
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Senha' secureTextEntry={true} leftIcon={
              <Icon name='lock' size={24} color='white'/>}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />
            </View>

          </ScrollView>
          <Text style={{fontWeight: 'normal', color:'red'}}> *Digite sua senha para confirmar </Text>

          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button raised title='Confirmar' onPress={ () =>  this.alert() } titleStyle={{ color: 'black' }}/>
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
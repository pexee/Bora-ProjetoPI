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
    novaSenha: '',
    novaSenha2: '',
    password: '',



  };

  componentDidMount(){
    console.log('\n\n didmount \n\n');
    const user = firebase.auth().currentUser;
    this.setState({nome: user.displayName, email: user.email});

  }


  reauthenticate = (senhaAtual) => {


    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
    console.log('\n\n email reauthenticate: '+ user.email)
    console.log('\n\n Senha reauthenticate:  '+ senhaAtual)

    return user.reauthenticateWithCredential(cred);
  }


  async changeSenha(){
    const { nome, email, password, novaSenha, novaSenha2 } = this.state;
    console.log('\n\n comecou \n\n')
    
  
    if(this.state.password.length < 6){
      alert('Digite sua senha')
      return;
    }
    if(this.state.novaSenha.length < 1){
      alert('Digite sua nova senha')
      return;
    }
    if(this.state.novaSenha.length < 6){
      alert('A nova senha deve conter no minimo 6 caracteres')
      return;
    }
    if(this.state.novaSenha.localeCompare(this.state.novaSenha2)){
      alert('Senhas diferentes')
      return;

    }

    
    try {
      await this.reauthenticate(password)
        
      
    } catch (error) {
      console.log('\nerro no reauthentication\n')
      console.log(error)
      alert('Senha Incorreta')
      return
    }
    var user = firebase.auth().currentUser;

    await user.updatePassword(novaSenha);

    alert('Senha Atualizada')
    this.props.navigation.navigate('EditarUsuario')
    



  }
  

  alert(){
    Alert.alert(
        "Alterar Senha",
        "Deseja realmente alterar sua senha?",
        [
            { text: "Não", onPress: () =>  null },
            { text: "Sim", onPress: () => this.changeSenha()},
            
        ],);
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
              //onChangeText={nome => this.setState({ nome })}
              />
            </View>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='E-mail' leftIcon={
              <Icon name='at' size={24} color='white'/>}
              value={this.state.email}
              //onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.input}>
             <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Nova Senha' secureTextEntry={true} leftIcon={
              <Icon name='lock' size={24} color='white'/>}
              value={this.state.novaSenha}
              onChangeText={novaSenha => this.setState({ novaSenha })}
              />
            </View>
            <View style={styles.input}>
            <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Confirme Nova Senha' secureTextEntry={true} leftIcon={
              <Icon name='lock' size={24} color='white'/>}
              value={this.state.novaSenha2}
              onChangeText={novaSenha2 => this.setState({ novaSenha2 })}
              />
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Senha Atual' secureTextEntry={true} leftIcon={
              <Icon name='lock' size={24} color='white'/>}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />
            </View>

          </ScrollView>
          <Text style={{fontWeight: 'normal', color:'red'}}> *Digite sua senha atual para confirmar </Text>

          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button onPress={ () =>  this.alert() } buttonStyle={{width: 60, height: 45}} icon={<Icon name='check' type='material' size={20} color="black" />} />
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
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header:{
    backgroundColor: '#1e90ff'
  }
}); 
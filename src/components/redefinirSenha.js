import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
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
    envio: false,




  };

  componentDidMount(){
    console.log('\n\n didmount \n\n');
    

  }

   

  async RedefinirSenha(){
    const { email, envio } = this.state;
    const aa = false;
    if(this.state.email.length<1){
      alert('Digite seu email')
      return;
    }
    try {
    
      await firebase.auth().sendPasswordResetEmail(email)
          

      alert('enviamos um link no seu email para poder redefinir a sua senha')
      this.props.navigation.navigate('Login')
    } catch (error) {
      alert('email nao cadastrado')
        console.log('email nao enviado:  '+ error)
        
    }

      
    
  }



  render() {
    return (
      <View style={styles.containerPrincipal}>  
            
        <View style={styles.containerInput}>

          <ScrollView>
          <Text style={{marginTop: 10,fontWeight: 'normal', color:'red'}}> *Digite seu email para redefinir sua Senha </Text>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='E-mail' leftIcon={
              <Icon name='at' size={24} color='white'/>}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              />
            </View>
            
          </ScrollView>
         
          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button onPress={() => this.RedefinirSenha()} buttonStyle={{width: 60, height: 45}} icon={<Icon name='check' type='material' size={20} color="black" />} />
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
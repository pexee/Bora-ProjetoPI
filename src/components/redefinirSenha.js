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




  };

  componentDidMount(){
    console.log('\n\n didmount \n\n');
    

  }


  async RedefinirSenha(){
    const { email } = this.state;
      firebase.auth().sendPasswordResetEmail(email).then(function(){
          console.log('email enviado:  '+ email)
          alert('enviamos um link no seu email para poder redefinir a sua senha')
      }).catch(function(error){
          console.log('email nao enviado:  '+ error)
      })
    
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
              <Button raised title='Confirmar' onPress={()=>{this.RedefinirSenha()}} titleStyle={{ color: 'black' }}/>
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
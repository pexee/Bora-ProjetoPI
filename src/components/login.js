import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { Input, Button, SocialIcon, ThemeProvider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';

const theme = {
  colors: {
    primary: 'white'
  }
}

export default class Login extends Component {
  state = {
    email: 'geeopedroso@gmail.com',
    password: 'aaaaaa',
    isAuthenticated: false,
  };
  componentDidMount(){
    this.islogged();
    
  }
  
 async islogged(){
   
   await firebase.auth().onAuthStateChanged(
      function(user){
        if(user){
          console.log(user)
          this.props.navigation.navigate('Home');

        }else{
          
        }
      }.bind(this)
    )
  }


  
  login = async () => {
    const { email, password } = this.state;
    
    
    try {

      
      await firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        
        console.log('entrou')
      }).catch(function(error){
        alert('Email/Senha incorreto')
        console.log(error)
      })

    } catch (error) {
      
    }

    
  }


  render() {
    
    return (
      <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.image} source={require('../images/logo.png')}/>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Input placeholder={'E-mail'}
            underlineColorAndroid='transparent' 
            placeholderTextColor='white' 
            leftIcon={<Icon name='user' size={23} color='white'/>}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            
            />
        </View>
        <View style={styles.input}>
          <Input placeholder={'Senha'} 
            underlineColorAndroid='transparent' 
            placeholderTextColor='white' 
            leftIcon={<Icon name='lock' size={23} color='white'/>} 
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
            />
        </View>
      </View>
      <View style={styles.inputContainer2}>
          <ThemeProvider theme={theme}>
            <Button raised title='Entrar' onPress={() => this.login()} titleStyle={{ color: 'black' }}/>
            </ThemeProvider>
      </View>
      <View style={styles.inputContainer3}>
        <Text style={styles.TextStyle} onPress={ () => this.props.navigation.navigate('RedefinirSenha')}  >Esqueci minha Senha</Text>
      </View>
      <View style={styles.inputContainer3}>
        <Text style={styles.TextStyle} onPress={ ()=> this.props.navigation.navigate('Cadastro') } >Não tem uma conta? Cadastra-se</Text>
      </View>
    </View>
    );
  }
      
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e90ff',
  },
  image: {
    width: 300,
    height: 150,
  },
  logoContainer: {
    alignItems: 'center',
  },
  input: {
    borderRadius: 15,
    backgroundColor: '#00bfff',
    marginTop: 10,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputContainer2: {
    marginTop: 15,
    paddingLeft: 70,
    paddingRight: 70,
  },
  inputContainer3: {
    marginTop: 15,
     justifyContent: 'center',
    alignItems: 'center',
    
  },
  googleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  TextStyle: {
    color: '#fff',
    textDecorationLine: 'underline',
    
  },
});
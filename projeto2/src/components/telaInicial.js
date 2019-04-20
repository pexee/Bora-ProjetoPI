import React, {Component} from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {StyleSheet, 
  Text, 
  View, 
  Image,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,
Button,
SocialIcon,
ThemeProvider,
} from 'react-native-elements';

const theme = {
  colors: {
    primary: 'white'
  }
}

type Props = {};
export default class App extends Component<Props> {
  state = {
    email: '',
    password: ''
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.image} source={require('./src/images/logo.png')}/>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Input placeholder={'E-mail'} underlineColorAndroid='transparent' placeholderTextColor='white' leftIcon={<Icon name='user' size={23} color='white'/>}/>
          </View>
          <View style={styles.input}>
            <Input placeholder={'Senha'} underlineColorAndroid='transparent' placeholderTextColor='white' leftIcon={<Icon name='lock' size={23} color='white'/>} />
          </View>
        </View>
        <View style={styles.inputContainer2}>
            <ThemeProvider theme={theme}>
             <Button raised title='Entrar' titleStyle={{ color: 'black' }}/>
             </ThemeProvider>
        </View>
        <View style={styles.inputContainer2}>
          <Text style={styles.TextStyle} onPress={ ()=> Linking.openURL('https://google.com') } >Não tem uma conta? Cadastra-se</Text>
        </View>
        <View style={styles.googleContainer}>
          <GoogleSigninButton style={{width: 48, height: 48 }} size={GoogleSigninButton.Size.Icon} color={GoogleSigninButton.Color.Dark} onPress={this._signIn} disabled={this.state.isSigninInProgress} />
          <SocialIcon title='Entre com o Facebook' type='facebook'/>
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
    width: 400,
    height: 200,
  },
  logoContainer: {
    alignItems: 'center',
    top: 20,
  },
  input: {
    borderRadius: 15,
    backgroundColor: '#00bfff',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputContainer2: {
    marginTop: 10,
    paddingLeft: 70,
    paddingRight: 70,
  },
  googleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  TextStyle: {
    color: '#fff',
    textDecorationLine: 'underline'
  },
});

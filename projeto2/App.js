import React, {Component} from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {StyleSheet, 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,
Button,
SocialIcon 
} from 'react-native-elements';
const {width: WIDTH} = Dimensions.get('window')

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
          <Input
            style={styles.input}
            placeholder={'E-mail'}
            underlineColorAndroid='transparent'
            leftIcon={<Icon name='user' size={23} color='white'/>}
          />
        </View>
        <View style={styles.inputContainer}> 
          <Input
            style={styles.input}
            placeholder={'Senha'}
            leftIcon={<Icon name='lock' size={23} color='white'/>}
          />
        </View>
        <View style={styles.inputContainer2}>
        <Button raised iconRight icon={{name: 'code'}} title='Entrar' />
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
    width: WIDTH - 55,
    height: 45,
    borderRadius: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#fff',
    marginHorizontal: 25,
  },
  inputContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  inputContainer2: {
    marginTop: 10,
    paddingLeft: 70,
    paddingRight: 70,
  },
  btnLogin: {
    width: WIDTH - 10,
    height: 45,
    fontSize: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  btnCadastrar: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
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

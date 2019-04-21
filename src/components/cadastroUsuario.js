import React, {Component} from 'react';
import {StyleSheet, 
  Text, 
  View, 
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,
  Button,
  ThemeProvider,
  Header,
} from 'react-native-elements';

const theme = {
  colors: {
    primary: 'white'
  }
}

const theme2 = {
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
      <View style={styles.containerPrincipal}>
      <Header centerComponent={{ text: 'Cadastro', style: { fontSize: 25, color: '#fff' } } }/>
        <View style={styles.containerInput}>
          <View style={styles.input}>
            <Input placeholderTextColor='#fff' placeholder='Nome' leftIcon={
            <Icon name='user' size={24} color='white'/>}/>
          </View>
          <View style={styles.input}>
            <Input placeholderTextColor='#fff' placeholder='E-mail' leftIcon={
            <Icon name='at' size={24} color='white'/>}/>
          </View>
          <View style={styles.input}>
            <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Senha' leftIcon={
            <Icon name='lock' size={24} color='white'/>}/>
          </View>
          <View style={styles.input}>
            <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Digite sua senha novamente' leftIcon={
            <Icon name='lock' size={24} color='white'/>}/>
          </View>
          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button raised title='Confirmar' titleStyle={{ color: 'black' }}/>
            </ThemeProvider>
          </View>
          <View style={styles.button}>
            <ThemeProvider theme={theme2}>
              <Button raised title='Cancelar' titleStyle={{ color: 'black' }}/>
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

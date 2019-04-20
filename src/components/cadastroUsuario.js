import React, {Component} from 'react';
import {StyleSheet, 
  Text, 
  View, 
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,
} from 'react-native-elements';


type Props = {};
export default class App extends Component<Props> {
  
  
  state = {
    email: '',
    password: ''
  }
  
  render() {
    return (
      <View style={styles.containerPrincipal}>
        <View style={styles.containerInput}>
          <View style={styles.input}>
            <Input placeholderTextColor='#fff' placeholder='Nome' leftIcon={
            <Icon name='user' size={24} color='white'/>}
            />
          </View>
          <View style={styles.input}>
            <Input placeholderTextColor='#fff' placeholder='E-mail' leftIcon={
            <Icon name='at' size={24} color='white'/>}
            />
          </View>
          <View style={styles.input}>
            <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Senha' leftIcon={
            <Icon name='lock' size={24} color='white'/>}
            />
          </View>
          <View style={styles.input}>
            <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Digite sua senha novamente' leftIcon={
            <Icon name='lock' size={24} color='white'/>}
            />
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
    marginTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    marginTop: 10,
    borderRadius:15,
    backgroundColor: '#00bfff',
  },
});

import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider} from 'react-native-elements';

const theme = {
  colors: {
    primary: 'white'
  }
}

const cadastroUsuario = () => (
  <View style={styles.containerPrincipal}>
    <View style={styles.containerInput}>
      <ScrollView>
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
      </ScrollView>
      <View style={styles.button}>
          <ThemeProvider theme={theme}>
            <Button raised title='Confirmar' titleStyle={{ color: 'black' }}/>
          </ThemeProvider>
        </View>
    </View>
  </View>
);

cadastroUsuario.navigationOptions = {
  title: 'Cadastro',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
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

export default cadastroUsuario;
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { Left, Body, Header, Title, Text } from 'native-base'


const theme = {
  colors: {
    primary: 'white'
  }
}

const dados = require('./login')

export default class excluirUsuario extends Component {
  state = {
    nome: '',
    email: '',
    password: '',
    password2: '',
    isAuthenticated: false,
    visivel: false,
    credential: '',

  };

  componentDidMount() {
    console.log('\n\n didmount \n\n');
    this.preencheUser();
    this.setState({ credential: dados.cred })
    console.log('\n\n\n\n\n\n\n ' + dados.cred + '\n\n\n\n\n')

  }

  async preencheUser() {
    const user = await firebase.auth().currentUser;
    this.setState({ nome: user.displayName, email: user.email });
    if (!user.providerData[0].providerId.localeCompare('password')) {
      this.setState({ visivel: true })
    } else {
      this.setState({ visivel: false })
    }

  }

  reauthenticate = (senhaAtual) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
    return user.reauthenticateWithCredential(cred);
  }


  apagarcontaGoogle() {
    var user = firebase.auth().currentUser;
    user.reauthenticateWithCredential(dados.cred).then(function () {

      var user = firebase.auth().currentUser;

      user.delete().then(function () {

        firebase.database().ref('/usuarios/' + user.uid).remove().then(function () {
          console.log('\n excluido do banco')

        }).catch(function (error) {
          console.log('\n nao excluido do banco')
        })
        console.log('\n Conta excluida \n')

        alert('Conta Excluida ')

      }).catch(function (error) {
        console.log('\n nao excluiu ')
        return
      })
    }).catch(function (error) {
      console.log('erro no reauthentication\n')
      console.log(error)
     
    })

  }
  apagarConta() {
    const { nome, email, password } = this.state;



    try {
      if (this.state.password.length < 6) {
        alert('Digite sua senha')
        return;
      }

      if (this.state.password.localeCompare(this.state.password2)) {
        alert('senhas diferentes')
        return;

      }

      this.reauthenticate(password).then(function () {

        var user = firebase.auth().currentUser;

        user.delete().then(function () {

          firebase.database().ref('/usuarios/' + user.uid).remove().then(function () {
            console.log('\n excluido do banco')

          }).catch(function (error) {
            console.log('\n nao excluido do banco')
          })
          console.log('\n Conta excluida \n')

          alert('Conta Excluida ')

        }).catch(function (error) {
          console.log('\n nao excluiu ')
          return
        })
      }).catch(function (error) {
        console.log('erro no reauthentication\n')
        console.log(error)
        alert('Senha Incorreta')
        return
      })


    } catch (error) {

    }

  }



  render() {
    return (
      <View style={styles.containerPrincipal}>
        <Header androidStatusBarColor="#1e90ff" style={styles.header}>
          <Left>
            <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.props.navigation.navigate('home')} hasTabs />
          </Left>
          <Body>
            <Title> Excluir Conta </Title>
          </Body>
        </Header>
        <View style={styles.containerInput}>
          <ScrollView>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='Nome' leftIcon={
                <Icon name='user' size={24} color='white' />}
                value={this.state.nome}
                onChangeText={nome => this.setState({ nome })}
              />
            </View>
            <View style={styles.input}>
              {this.state.visivel ? <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Senha' secureTextEntry={true} leftIcon={
                <Icon name='lock' size={24} color='white' />}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              /> : null}
            </View>
            <View style={styles.input}>
              {this.state.visivel ?
                <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Digite sua senha novamente' secureTextEntry={true} leftIcon={
                  <Icon name='lock' size={24} color='white' />}
                  value={this.state.password2}
                  onChangeText={password2 => this.setState({ password2 })}
                /> : null}
            </View>
          </ScrollView>
          {this.state.visivel ? <Text style={{ fontWeight: 'normal', color: 'red' }}> *Digite sua senha para confirmar </Text> : null}

          <View style={styles.button}>
            {this.state.visivel ? <ThemeProvider theme={theme}>
              <Button onPress={() => this.apagarConta()} buttonStyle={{ width: 60, height: 45 }} icon={<Icon name='check' type='material' size={20} color="black" />} />
            </ThemeProvider> : null}
          </View>

          <View style={styles.button}>
            {!this.state.visivel ? <ThemeProvider theme={theme}>
              <Button onPress={() => this.apagarcontaGoogle()} buttonStyle={{ width: 60, height: 45 }} icon={<Icon name='check' type='material' size={20} color="black" />} />
            </ThemeProvider> : null}
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
    borderRadius: 15,
    backgroundColor: '#00bfff',
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1e90ff'
  }
});
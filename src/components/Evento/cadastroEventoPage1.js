import React, {Component} from 'react';
import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Left, Body, Header, Title } from 'native-base'



const theme = {
  colors: {
    primary: 'black'
  }
}

const themeButton = {
  colors: {
    primary: 'white'
  }
}


export default class cadastroEventoPage1 extends Component{
  state = {
    nome: null,
  };

  verificaIsNull(){
    if(this.state.nome){
      module.exports.nome = this.state.nome;
      this.props.navigation.navigate('CadastroEventoPage2');
    }
    else{
            Alert.alert(
                "Criação de evento",
                "Por favor, insira um nome",
                [
                    { text: "OK", onPress: () =>  null },
                ],);
    }
    }

  render() {
    return (
      <View style={styles.container}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.props.navigation.navigate('Home')} hasTabs/>
            </Left>
            <Body>
            <Title> Criar Evento </Title>
            </Body>
          </Header>
        <View style={styles.icon}>
        <Icon name='map' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Qual o nome do seu evento?
          </Text>
        </View>
          <View style={styles.input}> 
          <Input placeholder={'Digite aqui'} underlineColorAndroid='transparent' placeholderTextColor='white' onChangeText={(nome) => this.setState({ nome})}/>
          </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={() => this.verificaIsNull()} titleStyle={{ color: 'black' }}/>
        </ThemeProvider>
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
  input: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginTop: 20,
    paddingLeft: 70,
    paddingRight: 70,
  },
  icon: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    marginTop: 40,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header:{
    backgroundColor: '#1e90ff'
  }
});
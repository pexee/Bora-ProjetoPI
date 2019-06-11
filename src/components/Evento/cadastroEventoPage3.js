import React, {Component} from 'react';
import {StyleSheet, View, Alert, Picker} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Left, Body, Header, Title } from 'native-base'

var msg = require('./cadastroEventoPage2');

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

  
export default class cadastroEventoPage3 extends Component{
    state = {
      descricao: null,
    }

    verificaIsNull(){
    if(this.state.descricao){
      module.exports.descricao = this.state.descricao;
      this.props.navigation.navigate('CadastroEventoPage4');
    }
    else{
            Alert.alert(
                "Criar evento",
                "Por favor, insira uma descrição",
                [
                    { text: "OK", onPress: () =>  null },
                ],);
    }
    }
    alert(){
      Alert.alert(
          "Deseja retornar a Home?",
          "Todo seu progresso de criação de evento sera perdido",
          [
              { text: "Não", onPress: () =>  null },
              { text: "Sim", onPress: () => this.props.navigation.navigate('Home')},
              
          ],);
}
    render() {
      return (
      <View style={styles.container}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.alert()} hasTabs/>
            </Left>
            <Body>
            <Title> Criar Evento </Title>
            </Body>
          </Header>
        <View style={styles.icon}>
        <Icon name='font' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Descrição do seu evento
          </Text>
        </View>
        <View style={styles.input}> 
          <Input placeholder={'Digite aqui'} underlineColorAndroid='transparent' 
          placeholderTextColor='white' onChangeText={(descricao) => this.setState({ descricao})}/>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={ ()=> this.verificaIsNull()} titleStyle={{ color: 'black' }}/>
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
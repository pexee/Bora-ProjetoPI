import React, {Component} from 'react';
import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, Text, Icon} from 'react-native-elements';
import {Left, Body, Header, Title } from 'native-base'



const theme = {
  colors: {
    primary: 'black'
  }
}

const themeButton = {
  colors: {
    primary: '#1e90ff'
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
                "Criar evento",
                "Por favor, insira um nome",
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
        <ScrollView>
        <View style={styles.icon}>
        <Icon name='bookmark' type='material' size={120} color="#1e90ff"/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: '#1e90ff' }}>
            Qual o nome do seu evento?
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Input placeholder={'Escreva'} underlineColorAndroid='transparent' placeholderTextColor='#a9a9a9' onChangeText={(nome) => this.setState({ nome})}/> 
          </View>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
          <Button onPress={() => this.verificaIsNull()} buttonStyle={{width: 60, height: 45}} icon={<Icon name='check' type='material' size={20} color="white" />} />
        </ThemeProvider>
        </View>
        </ScrollView>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    justifyContent: 'center', 
    alignItems: 'center',
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
  },
  inputContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
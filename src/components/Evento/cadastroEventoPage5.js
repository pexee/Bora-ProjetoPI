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


export default class cadastroEventoPage5 extends Component{
  state = {
    endereco: null,
  }

  verificaIsNull(){
    if(this.state.endereco){
      module.exports.endereco = this.state.endereco;
      this.props.navigation.navigate('CadastroEventoPage6');
    }
    else{
            Alert.alert(
                "Criar evento",
                "Por favor, insira um endereço",
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
        <Icon name='map-marker' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Qual o local do seu evento?
          </Text>
        </View>
          <View style={styles.input}> 
          <Input placeholder={'Endereço'} underlineColorAndroid='transparent' placeholderTextColor='white' onChangeText={(endereco) => this.setState({ endereco})}/>
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
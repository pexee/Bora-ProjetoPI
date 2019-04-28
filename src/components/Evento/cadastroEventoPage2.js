import React, {Component} from 'react';
import {StyleSheet, View, Picker} from 'react-native';
import { Input, Button, ThemeProvider, Text, Overlay, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import CadastroEventoPage3 from './cadastroEventoPage3'

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

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

class cadastroEventoPage2 extends Component{
  state = {Categoria: ''}
  updateCategoria = (Categoria) => {
     this.setState({ Categoria: Categoria })
  }
  state = {user: ''}
  updateUser = (user) => {
     this.setState({ user: user })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
        <Icon name='play' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Qual a categoria do seu evento?
          </Text>
        </View>
            <Button raised title='Ok' onPress={ ()=> this.props.navigation.navigate('cadastroEventoPage2') } titleStyle={{ color: 'black' }}/>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={ ()=> this.props.navigation.navigate('cadastroEventoPage3') } titleStyle={{ color: 'black' }}/>
        </ThemeProvider>
        </View>
    </View>
  );
  }
}

class cadastroEventoPage3 extends Component {
  render(){
      return (
          <CadastroEventoPage3/>
      );
  }
}

const AppSwitchNavigator = createStackNavigator({
  cadastroEventoPage2: {screen: cadastroEventoPage2,
    navigationOptions: {
      header: null,
    },
  },
  cadastroEventoPage3: {screen: cadastroEventoPage3,
    navigationOptions: {
      header: null,
    },
  },
});

const AppContainer = createAppContainer(AppSwitchNavigator);


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
  picker: {
    color: '#fff',
    borderRadius: 15,
  }
});
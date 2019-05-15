import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import CadastroEventoPage6 from './cadastroEventoPage6'

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

class cadastroEventoPage5 extends Component{
  state = {
    endereco: '',
  }
  render() {
    return (
      <View style={styles.container}>
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
            <Button raised title='Ok' onPress={ ()=> {module.exports.endereco = this.state.endereco; this.props.navigation.navigate('cadastroEventoPage6') }} titleStyle={{ color: 'black' }}/>
        </ThemeProvider>
        </View>
    </View>
  );
  }
}

class cadastroEventoPage6 extends Component {
  render(){
      return (
          <CadastroEventoPage6/>
      );
  }
}

const AppSwitchNavigator = createStackNavigator({
  cadastroEventoPage5: {screen: cadastroEventoPage5,
    navigationOptions: {
      header: null,
    },
  },
  cadastroEventoPage6: {screen: cadastroEventoPage6,
    navigationOptions: {
      header: null,
    },
  }
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
  }
});
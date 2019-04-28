import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import CadastroEventoPage2 from './cadastroEventoPage2'

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

class cadastroEventoPage1 extends Component{
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
        <Icon name='map' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Qual o nome do seu evento?
          </Text>
        </View>
          <View style={styles.input}> 
          <Input placeholder={'Digite aqui'} underlineColorAndroid='transparent' placeholderTextColor='white' />
          </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={ ()=> this.props.navigation.navigate('cadastroEventoPage2') } titleStyle={{ color: 'black' }}/>
        </ThemeProvider>
        </View>
    </View>
  );
  }
}

class cadastroEventoPage2 extends Component {
  render(){
      return (
          <CadastroEventoPage2/>
      );
  }
}

const AppSwitchNavigator = createStackNavigator({
  cadastroEventoPage1: {screen: cadastroEventoPage1,
    navigationOptions: {
      header: null,
    },
  },
  cadastroEventoPage2: {screen: cadastroEventoPage2,
    navigationOptions: {
      header: null,
    },
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

cadastroEventoPage2.navigationOptions = {
  title: 'Page 2',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
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
  }
});
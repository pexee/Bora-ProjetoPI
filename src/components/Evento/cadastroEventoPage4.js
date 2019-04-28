import React, {Component} from 'react';
import { View, Button, Text } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import CadastroEventoPage5 from './cadastroEventoPage5'

export default class App extends Component {
    render() {
      return <AppContainer />;
    }
  }
  
  class cadastroEventoPage4 extends Component{
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button 
          title="Local, data e hora:" onPress={() => this.props.navigation.navigate('cadastroEventoPage5') }
        />
      </View>
    );
    }
  }
  
  class cadastroEventoPage5 extends Component {
    render(){
        return (
            <CadastroEventoPage5/>
        );
    }
  }
  
  const AppSwitchNavigator = createStackNavigator({
    cadastroEventoPage4: {screen: cadastroEventoPage4,
        navigationOptions: {
            header: null,
          }
        },
    cadastroEventoPage5: {screen: cadastroEventoPage5,
        navigationOptions: {
            header: null,
          },
    },
  });
  
  const AppContainer = createAppContainer(AppSwitchNavigator);
  
  cadastroEventoPage5.navigationOptions = {
    title: 'Page 5',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor:'#1e90ff'
    }  
  }
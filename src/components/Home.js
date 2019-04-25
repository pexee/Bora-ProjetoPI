import React, {Component} from 'react';
import { View, Button, Text } from 'react-native';
import CadastroEvento from './cadastroEvento'

import {
    createSwitchNavigator,
    createAppContainer,
  } from 'react-navigation';

export default class App extends Component {
    render() {
      return <AppContainer />;
    }
  }

class paginaPrincipal extends Component{
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button 
          title="Cadastrar Evento" onPress={() => this.props.navigation.navigate('cadastroEvento') }
        />
      </View>
    );
    }
  }

class cadastroEvento extends Component {
    render(){
        return (
            <CadastroEvento/>
        );
    }
}

const AppSwitchNavigator = createSwitchNavigator({
    paginaPrincipal: {screen: paginaPrincipal},
    cadastroEvento: {screen: cadastroEvento}
  });
  
const AppContainer = createAppContainer(AppSwitchNavigator);
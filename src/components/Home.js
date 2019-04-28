import React, {Component} from 'react';
import { View, Button, Text } from 'react-native';
import CadastroEventoPage1 from './Evento/cadastroEventoPage1'
import EditarUsuario from './editarUsuario'
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class App extends Component {
    render() {
      return <AppContainer />;
    }
  }

class paginaPrincipal extends Component{
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Button 
          title="Cadastrar Evento" onPress={() => this.props.navigation.navigate('cadastroEventoPage1') }
        />
        <View  style={{marginTop: 10}}>
        <Button
          title="Editar usuario" onPress={() => this.props.navigation.navigate('editarUsuario') }
        />
        </View>
      </View>
    );
    }
  }

class cadastroEventoPage1 extends Component {
    render(){
        return (
            <CadastroEventoPage1/>
        );
    }
}

class editarUsuario extends Component {
  render(){
      return (
          <EditarUsuario/>
      );
  }
}


const AppSwitchNavigator = createStackNavigator({
    paginaPrincipal: {screen: paginaPrincipal,     navigationOptions: {
      header: null,
    }, },
    editarUsuario: {screen: editarUsuario },
    cadastroEventoPage1: {screen: cadastroEventoPage1}
  });
  
const AppContainer = createAppContainer(AppSwitchNavigator);

cadastroEventoPage1.navigationOptions = {
  title: 'Criar Evento',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}
editarUsuario.navigationOptions = {
  title: 'Editar Usuario',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}
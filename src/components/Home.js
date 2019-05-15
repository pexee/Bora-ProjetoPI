import React, {Component} from 'react';
import { View, Button, StyleSheet, Text} from 'react-native';
import CadastroEventoPage1 from './Evento/cadastroEventoPage1'
import EditarUsuario from './editarUsuario'
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import EditarEvento from './editarEvento'
import VisualizarEvento from './visualizarEvento'

export default class App extends Component {
    render() {
      return <AppContainer />;
    }
  }

class paginaPrincipal extends Component{
    render() {
      return (
        <View style={styles.container}>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content"
            leftComponent={<Icon style={styles.icone} name='bars' size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />}
            centerComponent={<Text style={styles.text} >Home</Text>}
            containerStyle={{
              height: 50,
              backgroundColor: '#1e90ff',
              justifyContent: 'space-around',
            }}
          />
        <View style={styles.container2}>
          <View style={styles.container3}>
          <Button 
            title="Cadastrar Evento" onPress={() => this.props.navigation.navigate('cadastroEventoPage1') }
          />
          </View>
          <View style={styles.container3}>
          <Button
            title="Editar evento" onPress={() => this.props.navigation.navigate('editarEvento') }
          />
        </View>
        <View style={styles.container3}>
          <Button 
            title="Visualizar Evento" onPress={() => this.props.navigation.navigate('visualizarEvento') }
          />
          </View>
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

class editarEvento extends Component{
  render(){
    return(
      <EditarEvento/>
    );
  }
}

class visualizarEvento extends Component{
  render(){
    return(
      <VisualizarEvento/>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  Home: {screen: paginaPrincipal},
  editarUsuario: {screen: editarUsuario}
})

const AppSwitchNavigator = createStackNavigator({
    paginaPrincipal: {screen: AppDrawerNavigator, navigationOptions: {
      header: null,
    }, },
    editarUsuario: {screen: AppDrawerNavigator},
    visualizarEvento: {screen: visualizarEvento, navigationOptions: {
      header: null,
    }, },
    cadastroEventoPage1: {screen: cadastroEventoPage1},
    editarEvento: {screen: editarEvento, navigationOptions: {
      header: null,
    },},
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
  title: 'Configurações do usuário',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  container2: {
    marginTop: 300,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  container3: {
    marginTop: 10,
  },
  icone: {
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
    color: 'white',
    fontSize: 18
  }
});
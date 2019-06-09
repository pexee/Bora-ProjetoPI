import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Login from './src/components/login'
import CadastroUsuario from './src/components/cadastroUsuario'
import Home from './src/components/Home'
import EditarUsuario from './src/components/editarUsuario'
import CadastroEventoPage1 from './src/components/Evento/cadastroEventoPage1'
import CadastroEventoPage2 from './src/components/Evento/cadastroEventoPage2'
import CadastroEventoPage3 from './src/components/Evento/cadastroEventoPage3'
import CadastroEventoPage4 from './src/components/Evento/cadastroEventoPage4'
import CadastroEventoPage5 from './src/components/Evento/cadastroEventoPage5'
import CadastroEventoPage6 from './src/components/Evento/cadastroEventoPage6'
import VisualizarEvento from './src/components/visualizarEvento'
import EventosConfirmados from './src/components/eventosConfirmados'
import MeusEventos from './src/components/meusEventos'
import Interesses from './src/components/interesses'
import EditarEvento from './src/components/editarEvento'



export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  Home: {screen: Home},
  EditarUsuario: {screen: EditarUsuario},
  CadastroEventoPage1: {screen: CadastroEventoPage1},
  MeusEventos: {screen: MeusEventos},
  EventosConfirmados: {screen: EventosConfirmados},
  Interesses: {screen: Interesses},
})


const AppStackNavigator = createStackNavigator({
  Login: {
    screen: Login, navigationOptions: {
      header: null,
    },
  },
  Cadastro: {
    screen: CadastroUsuario,
  },
  Home: {
    screen: AppDrawerNavigator, navigationOptions: {
      header: null,
    },
  },
  EditarUsuario: {
    screen: AppDrawerNavigator,
  },
  MeusEventos: {
    screen: AppDrawerNavigator, navigationOptions: {
      header: null,
    },
  },
  EventosConfirmados: {
    screen: AppDrawerNavigator, navigationOptions: {
      header: null,
    },
  },
  Interesses: {
    screen: Interesses,
  },
  VisualizarEvento: {
    screen: VisualizarEvento, navigationOptions: {
      header: null,
    },
  },
  CadastroEventoPage1: {
    screen: CadastroEventoPage1, 
  },
  CadastroEventoPage2: {
    screen: CadastroEventoPage2, navigationOptions: {
      header: null,
    },
  },
  CadastroEventoPage3: {
    screen: CadastroEventoPage3, navigationOptions: {
      header: null,
    },
  },
  CadastroEventoPage4: {
    screen: CadastroEventoPage4, navigationOptions: {
      header: null,
    },
  },
  CadastroEventoPage5: {
    screen: CadastroEventoPage5, navigationOptions: {
      header: null,
    },
  },
  CadastroEventoPage6: {
    screen: CadastroEventoPage6, navigationOptions: {
      header: null,
    },
  },
  EditarEvento: {
    screen: EditarEvento, navigationOptions: {
      header: null,
    },
  },
}, {
    initialRouteName: 'Login',
});

CadastroUsuario.navigationOptions = {
  title: 'Cadastro',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

CadastroEventoPage1.navigationOptions = {
  title: 'Criar evento',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

MeusEventos.navigationOptions = {
  title: 'Meus eventos',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

EventosConfirmados.navigationOptions = {
  title: 'Eventos Confirmados',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

EditarUsuario.navigationOptions = {
  title: 'Editar Usuário',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

const AppContainer = createAppContainer(AppStackNavigator)
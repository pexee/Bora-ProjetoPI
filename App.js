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
import VisualizarEventoFromHome from './src/components/visualizarEventoFromHome'
import VisualizarEventoFromMeusEventos from './src/components/visualizarEventoFromMeusEventos'
import VisualizarEventoFromConfirmados from './src/components/visualizarEventoFromConfirmados'
import EventosConfirmados from './src/components/eventosConfirmados'
import MeusEventos from './src/components/meusEventos'
import Interesses from './src/components/interesses'
import EditarEventoFromHome from './src/components/editarEventoFromHome'
import EditarEventoFromMeusEventos from './src/components/editarEventoFromMeusEventos'
import EditarEventoFromConfirmados from './src/components/editarEventoFromConfirmados'



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
  VisualizarEventoFromHome: {
    screen: VisualizarEventoFromHome, navigationOptions: {
      header: null,
    },
  },
  VisualizarEventoFromMeusEventos: {
    screen: VisualizarEventoFromMeusEventos, navigationOptions: {
      header: null,
    },
  },
  VisualizarEventoFromConfirmados: {
    screen: VisualizarEventoFromConfirmados, navigationOptions: {
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
  EditarEventoFromHome: {
    screen: EditarEventoFromHome, navigationOptions: {
      header: null,
    },
  },
  EditarEventoFromMeusEventos: {
    screen: EditarEventoFromMeusEventos, navigationOptions: {
      header: null,
    },
  },
  EditarEventoFromConfirmados: {
    screen: EditarEventoFromConfirmados, navigationOptions: {
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
  title: 'Eventos confirmados',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

EditarUsuario.navigationOptions = {
  title: 'Editar usuário',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

const AppContainer = createAppContainer(AppStackNavigator)
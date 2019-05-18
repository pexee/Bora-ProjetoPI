import React, {Component} from 'react';
import { View, FlatList, Image, StyleSheet, Text} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right, Header, Title } from 'native-base'
import CadastroEventoPage1 from './Evento/cadastroEventoPage1'
import CadastroEventoPage2 from './Evento/cadastroEventoPage2'
import CadastroEventoPage3 from './Evento/cadastroEventoPage3'
import CadastroEventoPage4 from './Evento/cadastroEventoPage4'
import CadastroEventoPage5 from './Evento/cadastroEventoPage5'
import CadastroEventoPage6 from './Evento/cadastroEventoPage6'
import EditarUsuario from './editarUsuario'
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import VisualizarEvento from './visualizarEvento'
import { thisTypeAnnotation } from '@babel/types';

var data = null;
var a = false;

export default class App extends Component {
    render() {
      return <AppContainer />;
    }
  }

class paginaPrincipal extends Component{
  state = {
    data: data,
  }

  async teste(){
    data = [];
    await firebase.database().ref('/eventos/').once('value', function(snapshot){
      snapshot.forEach(function(childSnapshot){
        data.push(childSnapshot.val());
      });
    });
    //data = x;
    await this.setState({data: data});
  }

carregar(){
  this.teste();
  return <Icon type='material' name='loop' size={120} color={"black"} />
}


renderList(){
  this.teste();
  return <Container>
        <Content>
         <FlatList
        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
           <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text> {rowData.nome} </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody button onPress={() => {module.exports.dados = rowData; this.props.navigation.navigate('visualizarEvento')}}>
              <Image source={{uri: rowData.imageUrl}} style={{height: 180, width: 300, resizeMode: 'stretch'}} />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon type='font-awesome' size={10} name="thumbs-up" />
                  <Text>12 bora</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon type='font-awesome' size={10} name="calendar" />
                  <Text> 22/5 </Text>
                </Button>
              </Body>
              <Right>
                <Text> 11:30h </Text>
              </Right>
            </CardItem>
          </Card>
          );
        }}
        keyExtractor={(item, index) => index}/>
        </Content>
      </Container>
}

  
    render() {
      return (
        <View style={styles.container}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon type='font-awesome' color='white' name='bars' onPress={() => this.props.navigation.toggleDrawer()} hasTabs/>
            </Left>
            <Body>
            <Title> Home </Title>
            </Body>
          </Header>
          <Container>
            {this.state.data ? this.renderList() : this.carregar()}
          </Container>
          
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

class cadastroEventoPage2 extends Component {
  render(){
      return (
          <CadastroEventoPage2/>
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

class cadastroEventoPage4 extends Component {
  render(){
      return (
          <CadastroEventoPage4/>
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

class cadastroEventoPage6 extends Component {
  render(){
      return (
          <CadastroEventoPage6/>
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


class visualizarEvento extends Component{
  render(){
    return(
      <VisualizarEvento/>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  Home: {screen: paginaPrincipal},
  editarUsuario: {screen: editarUsuario},
  cadastroEventoPage1: {screen: cadastroEventoPage1}
})

const AppSwitchNavigator = createStackNavigator({
    paginaPrincipal: {screen: AppDrawerNavigator, navigationOptions: {
      header: null,
    }, },
    editarUsuario: {screen: AppDrawerNavigator},
    visualizarEvento: {screen: visualizarEvento, navigationOptions: {
      header: null,
    },},
    cadastroEventoPage1: {screen: AppDrawerNavigator},
    cadastroEventoPage2: {screen: cadastroEventoPage2, navigationOptions: {
      header: null,
    },},
    cadastroEventoPage3: {screen: cadastroEventoPage3, navigationOptions: {
      header: null,
    },},
    cadastroEventoPage4: {screen: cadastroEventoPage4, navigationOptions: {
      header: null,
    },},
    cadastroEventoPage5: {screen: cadastroEventoPage5, navigationOptions: {
      header: null,
    },},
    cadastroEventoPage6: {screen: cadastroEventoPage6, navigationOptions: {
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
  title: 'Editar informações',
  headerTintColor: "white",
  headerStyle: {
    backgroundColor:'#1e90ff'
  }  
}

visualizarEvento.navigationOptions = {
  title: 'Evento',
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
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  container3: {
    marginTop: 1,
  },
  icone: {
    marginBottom: 20,
  },
  card: {
    width: 180,
    height: 250,
  },
  textItem: {
    textAlign: 'left',
    color: 'black',
    fontSize: 5,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  text2:{
    color: '#1e90ff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',

  }, 
  header:{
    backgroundColor: '#1e90ff'
  }
});
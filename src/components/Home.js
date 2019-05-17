import React, {Component} from 'react';
import { View, FlatList, Image, StyleSheet, Text} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right } from 'native-base'
import CadastroEventoPage1 from './Evento/cadastroEventoPage1'
import EditarUsuario from './editarUsuario'
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import firebase from 'react-native-firebase';
import {Header} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import VisualizarEvento from './visualizarEvento'

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
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content"
            leftComponent={<Icon type='font-awesome' name='bars' size={25} color='white' onPress={() => this.props.navigation.toggleDrawer()} />}
            centerComponent={<Text style={styles.text} >Home</Text>}
            containerStyle={{
              height: 50,
              backgroundColor: '#1e90ff',
              justifyContent: 'space-around',
            }}
          />
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
    }, },
    cadastroEventoPage1: {screen: AppDrawerNavigator},
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
    marginBottom: 20,
    color: 'white',
    fontSize: 20,
  },
  text2:{
    color: '#1e90ff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',

  }
});
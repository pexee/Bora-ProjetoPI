import React, {Component} from 'react';
import { View, ActivityIndicator, FlatList, Image, StyleSheet, Alert} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right, Header, Title } from 'native-base'
import firebase from 'react-native-firebase';
import { Icon, Text } from 'react-native-elements';


var data = null;
var user = null;
var lista = [];

export default class Home extends Component{

  state = {

  }

  constructor(){
    super()
    this.islogged();
    user = firebase.auth().currentUser;
    module.exports.user = user.uid;
    this.state = {
        eventos: null,
        interesses: '', 
    }
  }

  componentDidMount(){
    console.log('\n\n didmount \n\n');
  }


  async getListas(){
    lista = [];
    await firebase.database().ref('/usuarios/' + user.uid + '/interesses/').once('value', function(snapshot1){
      snapshot1.forEach(function(childSnapshot1){
        if(childSnapshot1.val() == true){
          firebase.database().ref('/eventos/').once('value', function(snapshot2){
            snapshot2.forEach(function(childSnapshot2){
              firebase.database().ref('/eventos/' + childSnapshot2.key + '/categorias/').once('value', function(snapshot3){
                snapshot3.forEach(function(childSnapshot3){
                  if(childSnapshot3.key == childSnapshot1.key && childSnapshot3.val() == true){
                    var i;
                    var aux = false;
                    for(i = 0; i < lista.length; i++){
                      if(lista[i].key == childSnapshot2.val().key){
                        aux = true;
                        break;
                      }
                    }
                    if(aux == false){
                      lista.push(childSnapshot2.val());
                    }
                  }
                });
              });
            });
            });
        }
      });
    });
    await this.setState({eventos: lista});

}

  async islogged(){
    await firebase.auth().onAuthStateChanged(
       function(user){
         if(user){
         
           //this.setState({usuario: firebase.auth().currentUser})
         }else{
           console.log('home \n usuario deslogado \n' + user)
          this.props.navigation.navigate('Login')
         }
       }.bind(this)
     )
   }
  
inloading(){
  this.getListas();
  return <ActivityIndicator size="large" color="#1e90ff" />
}

renderList(){
  this.getListas();
  return <Container>
        <Content>
          <View style={styles.teste}>
            <Text h3 style={{color:'#1e90ff'}}> Eventos  </Text>
          </View>
         <FlatList
        data={this.state.eventos}
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
            {console.log(rowData.imageUrl)}
            <CardItem cardBody button onPress={() => {module.exports.dados = rowData; this.props.navigation.navigate('VisualizarEventoFromHome')}}>
              <Image source={{uri: rowData.imageUrl}} style={{height: 180, width: 350, resizeMode: 'stretch'}} />
            </CardItem>
            <CardItem>
              <Left>
                  <Icon type='font-awesome' size={12} name="thumbs-up" />
                  <Text> {rowData.confirmados} bora       </Text>
                  <Icon type='font-awesome' size={12} name="calendar" />
                  <Text> {rowData.dataInicio} </Text>
                  </Left>
              <Right>
                <Text> {rowData.horarioInicio}h </Text>
              </Right>
            </CardItem>
          </Card>
          );
        }}
        keyExtractor={(item, index) => index}/>
        </Content>
      </Container>
}

alert(){
  Alert.alert(
      "Logoff",
      "Deseja realmente sair da sua conta?",
      [
          { text: "Não", onPress: () =>  null },
          { text: "Sim", onPress: () => firebase.auth().signOut()},
          
      ],);
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
            <Right>
              <Button transparent>
                <Icon color='white' name='exit-to-app' onPress={() => this.alert()} ></Icon>
              </Button>
            </Right>
          </Header>
          <Container>
            {this.state.eventos ?  this.renderList() : this.inloading()}

          </Container>
       
          
    </View>
      );
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
  },
  teste: {
    justifyContent: 'center', 
    alignItems: 'center', 
  }
});
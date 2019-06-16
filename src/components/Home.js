import React, {Component} from 'react';
import { View, ActivityIndicator, FlatList, Image, StyleSheet, Text, Alert} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right, Header, Title } from 'native-base'
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';


var data = null;

export default class Home extends Component{
  state = {
    data: data,
  }

  constructor(){
    super()
    this.islogged();
    const user = firebase.auth().currentUser;
    module.exports.user = user.uid;
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
  

  async carregarLista(){
    data = [];
    await firebase.database().ref('/eventos/').once('value', function(snapshot){
      snapshot.forEach(function(childSnapshot){
        data.push(childSnapshot.val());
      });
    });
    //data = x;
    await this.setState({data: data});
  }

inloading(){
  this.carregarLista();
  return <ActivityIndicator size="large" color="#1e90ff" />
}


renderList(){
  this.carregarLista();
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
            <CardItem cardBody button onPress={() => {module.exports.dados = rowData; this.props.navigation.navigate('VisualizarEventoFromHome')}}>
              <Image source={{uri: rowData.imageUrl}} style={{height: 180, width: 300, resizeMode: 'stretch'}} />
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
            {this.state.data ? this.renderList() : this.inloading()}
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
  }
});
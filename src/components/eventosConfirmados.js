import React, {Component} from 'react';
import { View, ActivityIndicator, FlatList, Image, StyleSheet, Text} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right, Header, Title } from 'native-base'
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';


const dados = require('./Home');

var data = null;

export default class eventosConfirmados extends Component{  
    state = {
        data: data,
      }

    
      async carregarLista(){
        data = [];
        await firebase.database().ref('/usuarios/' + dados.user + '/eventos/').once('value',function(snapshot){
          snapshot.forEach(function(childSnapshot){
            if(childSnapshot.val() == true){
              firebase.database().ref('/eventos/' + childSnapshot.key).once('value').then(function(snapshot){
                data.push(snapshot.val());
              });
            }
          });
        });
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
                <CardItem cardBody button onPress={() => {module.exports.dados = rowData; this.props.navigation.navigate('VisualizarEventoFromConfirmados')}}>
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
    
      
        render() {
          return (
            <View style={styles.container}>
              <Header androidStatusBarColor="#1e90ff" style={styles.header}>
                <Left>
                  <Icon type='font-awesome' color='white' name='bars' onPress={() => this.props.navigation.toggleDrawer()} hasTabs/>
                </Left>
                <Body>
                <Title> Eventos confirmados </Title>
                </Body>
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
import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider} from 'react-native-elements';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title } from 'native-base'

const theme = {
  colors: {
    primary: 'white'
  }
}
const user =  firebase.auth().currentUser;


export default class editarUsuario extends Component{
  state = {
    nome: '',
    email: '',
    password: '',
    password2: '',
    isAuthenticated: false,
    visivel: false,
    
  };
  
  componentDidMount(){
    console.log(user);
   
    this.preencheUser();
    
  }
  async preencheUser(){
    const user = await firebase.auth().currentUser;
    this.setState({nome: user.displayName, email: user.email});
    if(!user.providerData[0].providerId.localeCompare('password')){
      this.setState({visivel: true})
    }else{
      this.setState({visivel: false})
    }
    
  }

  editarconta = async () => {
    const { nome, email, password } = this.state;
    var database = firebase.database();

     
    try {
     
      if (user) {
        user.updateProfile({
          displayName: nome
        })
        
        firebase.database().ref('/usuarios/'+user.uid).update({
          displayName: nome,
         
        })
        alert( 'alterado com sucesso')

      } else {
        console.log('user vazio')
      }
      
    } catch (error) {
      console.log('atualizaçao nao deu bom')
    }
    
  }
  
  
  render() {
    return (
        <View style={styles.containerPrincipal}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.props.navigation.navigate('Home')} hasTabs/>
            </Left>
            <Body>
            <Title> Editar informações </Title>
            </Body>
          </Header>
        <View style={styles.containerInput}>
          <ScrollView>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='Nome' leftIcon={
              <Icon name='user' size={24} color='white'/>}
              value={this.state.nome}
              onChangeText={nome => this.setState({ nome })}
              />
            </View>
            
          </ScrollView>
          <View style={styles.button2}>
            <ThemeProvider theme={theme}>
            <Button onPress={() => {this.editarconta(); this.props.navigation.navigate('Home')}}  buttonStyle={{width: 60, height: 45}} icon={<Icon name='check' type='material' size={20} color="black" />} />
            </ThemeProvider>
          </View>
          
          <View style={styles.button}>
          {this.state.visivel ? <ThemeProvider theme={theme}>
               <Button raised title='Alterar Email'  onPress={()=> {this.props.navigation.navigate('AlterarEmail')}} titleStyle={{ color: 'black' }}/> 
            </ThemeProvider> :null}
          </View>
          <View style={styles.button}>
          {this.state.visivel ?  <ThemeProvider theme={theme}>
            <Button raised title='Alterar Senha' onPress={()=> {this.props.navigation.navigate('AlterarSenha')}}  titleStyle={{ color: 'black' }}/> 

            </ThemeProvider>: null}
          </View>
        </View>
      </View>
  );
  }
}


const styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor: '#1e90ff',
    },
    containerInput: {
      marginTop: 60,
      paddingLeft: 20,
      paddingRight: 20,
    },
    input: {
      marginTop: 10,
      borderRadius:15,
      backgroundColor: '#00bfff',
    },
    button: {
      marginTop: 10,
      paddingLeft: 70,
      paddingRight: 70,
    },
    button2: {
      marginTop: 10,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    header:{
      backgroundColor: '#1e90ff'
    }
  });
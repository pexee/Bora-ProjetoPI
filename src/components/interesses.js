import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, Dimensions, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider, Text, CheckBox} from 'react-native-elements';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title } from 'native-base'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './Home'

var {height, width} = Dimensions.get('window');

const theme = {
    colors: {
      primary: 'white'
    }
  }

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}


class interesses extends Component{ 
  constructor() {
    super();
    this.state = {
       switch1Value: false,
    }
 }
 toggleSwitch1 = (value) => {
    this.setState({switch1Value: value})
    console.log('Switch 1 is: ' + value)
 }
  render() {
    return (
        <View style={styles.containerPrincipal}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.props.navigation.navigate('home')} hasTabs/>
            </Left>
            <Body>
            <Title> Interesses </Title>
            </Body>
          </Header>
            <View style={styles.containerCheckBox}>
              <ScrollView>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Rock </Text>
                  <Switch toggleSwitch1 = {this.toggleSwitch1} switch1Value = {this.state.switch1Value}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Sertanejo </Text>
                  <Switch toggleSwitch1 = {this.toggleSwitch1} switch1Value = {this.state.switch1Value}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Pagode </Text>
                  <Switch toggleSwitch1 = {this.toggleSwitch1} switch1Value = {this.state.switch1Value}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Samba </Text>
                  <Switch toggleSwitch1 = {this.toggleSwitch1} switch1Value = {this.state.switch1Value}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Eletro </Text>
                  <Switch toggleSwitch1 = {this.toggleSwitch1} switch1Value = {this.state.switch1Value}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Funk </Text>
                  <Switch toggleSwitch1 = {this.toggleSwitch1} switch1Value = {this.state.switch1Value}/>
                </View>
                <View style={styles.sw}>
                  <Text style={styles.txt}>Pop </Text>
                  <Switch toggleSwitch1 = {this.toggleSwitch1} switch1Value = {this.state.switch1Value}/>
                </View>
              </ScrollView>
            </View>
            <View style={styles.button}>
                <ThemeProvider theme={theme}>
            <Button raised title='Confirmar' onPress={() => {this.props.navigation.navigate('home')}} titleStyle={{ color: 'black' }}/>
            </ThemeProvider>
      </View>
      </View>
  );
  }
}

class home extends Component {
  render(){
      return (
          <Home/>
      );
  }
}

const AppSwitchNavigator = createStackNavigator({
  interesses: {screen: interesses,
    navigationOptions: {
      header: null,
    },
  },
  home: {screen: home,
    navigationOptions: {
      header: null,
    },
  }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
    containerPrincipal: {
      flex: 1,
      backgroundColor: '#1e90ff',
    },
    containerCheckBox: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: 380,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    header:{
        backgroundColor: '#1e90ff'
    },
    button: {
        marginTop: 10,
        paddingLeft: 70,
        paddingRight: 70,
      },
    sw : {
      marginTop: 10,
      height: 40,
      width: (width-(width*0.2)),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 15
    },
    txt: {
      color: 'white', 
      paddingLeft: 10
    }
  });
import React, {Component} from 'react';
import {StyleSheet, View, Picker} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import CadastroEventoPage4 from './cadastroEventoPage4'

const theme = {
  colors: {
    primary: 'black'
  }
}

const themeButton = {
  colors: {
    primary: 'white'
  }
}

export default class App extends Component {
    render() {
      return <AppContainer />;
    }
  }
  
  class cadastroEventoPage3 extends Component{
    render() {
      return (
      <View style={styles.container}>
        <View style={styles.icon}>
        <Icon name='font' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Descrição do seu evento
          </Text>
        </View>
        <View style={styles.input}> 
          <Input placeholder={'Digite aqui'} underlineColorAndroid='transparent' placeholderTextColor='white' />
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={ ()=> this.props.navigation.navigate('cadastroEventoPage4') } titleStyle={{ color: 'black' }}/>
        </ThemeProvider>
        </View>
      </View>
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
  
  const AppSwitchNavigator = createStackNavigator({
    cadastroEventoPage3: {screen: cadastroEventoPage3, 
      navigationOptions: {
        header: null,
      },
    },
    cadastroEventoPage4: {screen: cadastroEventoPage4,
        navigationOptions: {
            header: null,
          },
    },
  });
  
  const AppContainer = createAppContainer(AppSwitchNavigator);
  
  cadastroEventoPage4.navigationOptions = {
    title: 'Page 4',
    headerTintColor: "white",
    headerStyle: {
      backgroundColor:'#1e90ff'
    }  
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e90ff',
    },
    input: {
      marginTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    button: {
      marginTop: 20,
      paddingLeft: 70,
      paddingRight: 70,
    },
    icon: {
      justifyContent: 'center', 
      alignItems: 'center',
      marginTop: 50,
    },
    text: {
      marginTop: 40,
      justifyContent: 'center', 
      alignItems: 'center',
    }
  });
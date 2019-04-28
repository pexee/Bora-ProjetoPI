import React, {Component, Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import { Input, Button, ThemeProvider, Text, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import CadastroEventoPage3 from './cadastroEventoPage3'
import Overlay from 'react-native-modal-overlay';

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

class cadastroEventoPage2 extends Component{
  state = {modalVisible: false}
  
  showOverlay() {
    this.setState({modalVisible: true})
  }
  
  onClose = () => this.setState({ modalVisible: false});


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
        <Icon name='play' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Qual a categoria do seu evento?
          </Text>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised titleStyle={{ color: 'black' }} onPress={this.showOverlay.bind(this)} title="Escolha as categorias"/>
              <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside
              animationType="zoomIn" containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
              childrenWrapperStyle={{backgroundColor: '#eee'}}
              animationDuration={500}>
              {
                (hideModal, overlayState) => (
                  <Fragment>
                    <View style={styles.overlayContainer}>
                      <Text>Escolha as categorias para seu evento:</Text>
                      <CheckBox title='Rock' checked={this.state.checked}/>
                      <CheckBox title='Sertanejo' checked={this.state.checked}/>
                      <CheckBox title='Pagode' checked={this.state.checked}/>
                      <CheckBox title='Samba' checked={this.state.checked}/>
                      <CheckBox title='Eletro' checked={this.state.checked}/>
                      <CheckBox title='Funk' checked={this.state.checked}/>
                      <View style={styles.overlayButton}>
                        <Button raised titleStyle={{ color: 'black' }} title="Confirmar" onPress={hideModal}/>
                      </View>
                    </View>
                  </Fragment>
                )
              }
            </Overlay>
          </ThemeProvider>
      </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={ ()=> this.props.navigation.navigate('cadastroEventoPage3') } titleStyle={{ color: 'black' }}/>
        </ThemeProvider>
        </View>
    </View>
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

const AppSwitchNavigator = createStackNavigator({
  cadastroEventoPage2: {screen: cadastroEventoPage2,
    navigationOptions: {
      header: null,
    },
  },
  cadastroEventoPage3: {screen: cadastroEventoPage3,
    navigationOptions: {
      header: null,
    },
  },
});

const AppContainer = createAppContainer(AppSwitchNavigator);


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
  },
  overlayContainer: {
    borderBottomWidth: 1, 
    paddingTop: 10
  },
  overlayButton: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 70,
    paddingRight: 70,
  },
});
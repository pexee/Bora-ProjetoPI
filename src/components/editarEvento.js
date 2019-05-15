import React, {Component, Fragment} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, ThemeProvider, Header, CheckBox} from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
import moment from 'moment'
import DateTimePicker from "react-native-modal-datetime-picker";

const theme = {
  colors: {
    primary: 'white'
  }
}

const themeButton = {
  colors: {
    primary: 'white'
  }
}

export default class App extends Component{

  state = {modalVisible: false}
  
  showOverlay() {
    this.setState({modalVisible: true})
  }
  
  onClose = () => this.setState({ modalVisible: false});

  constructor(){
    super()
    this.state= {
      isVisible: false,
      chosenDate: ''
    }
  }

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format('DD/MM/YYYY')
    })
  }

  showPicker = () => {
    this.setState({
      isVisible: true
    })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false
    })
  }
  
  render() {
    return (
        <View style={styles.containerPrincipal}>
          <Header
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content"
            leftComponent={<Icon style={styles.icone} name='bars' size={30} color='white' onPress={() => this.props.navigation.toggleDrawer()} />}
            centerComponent={<Text style={styles.text} >Editar evento</Text>}
            containerStyle={{
              height: 50,
              backgroundColor: '#1e90ff',
              justifyContent: 'space-around',
            }}
          />
        <View style={styles.containerInput}>
          <ScrollView>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='Nome' leftIcon={
              <Icon name='map' size={24} color='white'/>}/>
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Local' leftIcon={
              <Icon name='map-marker' size={24} color='white'/>}/>
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Descrição' leftIcon={
              <Icon name='font' size={24} color='white'/>}/>
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
            <Button raised title="Escolha a data" onPress={this.showPicker} titleStyle={{ color: 'black' }} />
            <DateTimePicker isVisible={this.state.isVisible} onConfirm={this.handlePicker} onCancel={this.hidePicker} mode={'datetime'} />
          </ThemeProvider>
        </View>
          </ScrollView>
          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button raised title='Confirmar' titleStyle={{ color: 'black' }}/>
            </ThemeProvider>
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
      marginTop: 20,
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
    icone: {
      marginBottom: 20,
    },
    text: {
      marginBottom: 20,
      color: 'white',
      fontSize: 18
    },
    button: {
      marginTop: 20,
      paddingLeft: 70,
      paddingRight: 70,
    },
    overlayButton: {
      marginTop: 5,
      marginBottom: 5,
      paddingLeft: 70,
      paddingRight: 70,
    },
    inputText: {
      marginTop: 10,
      borderRadius: 15,
      backgroundColor: '#00bfff',
      justifyContent: 'center', 
      alignItems: 'center',
    },
  });
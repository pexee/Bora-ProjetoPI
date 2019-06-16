import React, {Component, Fragment} from 'react';
import {Left, Body, Header, Title } from 'native-base'
import {StyleSheet, ScrollView, View, Image, NativeModules, Alert} from 'react-native';
import { Input, Button, ThemeProvider, Text, CheckBox} from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import moment from 'moment';


var ImagePicker = NativeModules.ImageCropPicker;
const dados = require('./meusEventos');
const storage = firebase.storage();

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

var d = moment().toDate()

export default class editarEvento extends Component{

   state = {

  }
  
  showOverlay() {
    this.setState({modalVisible: true})
  }
  
  onClose = () => this.setState({ modalVisible: false});

  constructor(){
    super()
    this.state= {
      isDateVisible1: false,
      isDateVisible2: false,
      isTimeVisible1: false,
      isTimeVisible2: false,
      dataInicio: dados.dados.dataInicio,
      dataFim: dados.dados.dataFim,
      horarioInicio: dados.dados.horarioInicio,
      horarioFim: dados.dados.horarioFim,
      modalVisible: false,
      rock: dados.dados.categorias.rock,
      sertanejo: dados.dados.categorias.sertanejo,
      pagode: dados.dados.categorias.pagode,
      samba: dados.dados.categorias.samba,
      eletro: dados.dados.categorias.eletro,
      funk: dados.dados.categorias.funk,
      nome: dados.dados.nome,
      descrição: dados.dados.descrição,
      endereco: dados.dados.endereco,
      image: null,
    }
  }

  handleDatePicker1 = (date) => {
    var date = moment(date).format('DD/MM/YYYY');
    this.setState({
      isDateVisible1: false,
      dataInicio: date
    })
  }

  handleDatePicker2 = (date) => {
    var date = moment(date).format('DD/MM/YYYY');
    this.setState({
      isDateVisible2: false,
      dataFim: date
    })
  }


  handleTimePicker1 = (time) => {
    var date = moment(time).format('HH:mm');
    this.setState({
      isTimeVisible1: false,
      horarioInicio: date
    })
  }

  handleTimePicker2 = (time) => {
    var date = moment(time).format('HH:mm');
    this.setState({
      isTimeVisible2: false,
      horarioFim: date
    })
  }

  showDatePicker1 = () => {
    this.setState({
      isDateVisible1: true
    })
  }


  hideDatePicker1 = () => {
    this.setState({
      isDateVisible1: false
    })
  }

  showDatePicker2 = () => {
    this.setState({
      isDateVisible2: true
    })
  }


  hideDatePicker2 = () => {
    this.setState({
      isDateVisible2: false
    })
  }

  showTimePicker1 = () => {
    this.setState({ isTimeVisible1: true });
  };

  hideTimePicker1 = () => {
    this.setState({ isTimeVisible1: false });
  };
  
  showTimePicker2 = () => {
    this.setState({ isTimeVisible2: true });
  };

  hideTimePicker2 = () => {
    this.setState({ isTimeVisible2: false });
  };

  pickSingle(cropit, circular=false, mediaType) {
    ImagePicker.openPicker({
      width: 400,
      height: 320,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      includeExif: true,
    }).then(image => {
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
}
alert(){
  Alert.alert(
      "Editar evento",
      "Deseja editar o evento?",
      [
          { text: "Não", onPress: () =>  null },
          { text: "Sim", onPress: () => this.editarEvento()},
          
      ],);
}
  async editarEvento(){
    var evento = null;
    var categorias = {
      rock: this.state.rock,
      sertanejo: this.state.sertanejo,
      pagode: this.state.pagode,
      samba: this.state.samba,
      eletro: this.state.eletro,
      funk: this.state.funk,
    };
    if(this.state.image){
      var imageRef = storage.ref('eventos').child(dados.dados.key);
      await imageRef.delete();
      imageRef = storage.ref('eventos').child(dados.dados.key);
      const img = await imageRef.putFile(this.state.image.uri);
      evento = {
        nome: this.state.nome,
        descrição: this.state.descrição,
        categorias: categorias,
        dataInicio: this.state.dataInicio,
        dataFim: this.state.dataFim,
        horarioInicio: this.state.horarioInicio,
        horarioFim: this.state.horarioFim,
        endereco: this.state.endereco,
        imageUrl: img.downloadURL,
      };
    }
    else{
      evento = {
        nome: this.state.nome,
        descrição: this.state.descrição,
        categorias: categorias,
        dataInicio: this.state.dataInicio,
        dataFim: this.state.dataFim,
        horarioInicio: this.state.horarioInicio,
        horarioFim: this.state.horarioFim,
        endereco: this.state.endereco,
      };
    }
    await firebase.database().ref('/eventos/'+dados.dados.key).update(evento);
    Alert.alert(
        "Editar evento",
        "Evento editado com sucesso!",
        [
            { text: "Ok", onPress: () => this.props.navigation.navigate('MeusEventos') },  
        ],);
      }
  
  render() {
    return (
        <View style={styles.containerPrincipal}>
            <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='backward' onPress={() => this.props.navigation.navigate('MeusEventos')} hasTabs/>
            </Left>
            <Body>
            <Title> Editar Evento </Title>
            </Body>
          </Header>
          <ScrollView>
        <View style={styles.containerInput}>
            <View style={styles.input}>
              <Input placeholderTextColor='#fff' placeholder='Nome' leftIcon={
              <Icon name='map' size={24} color='white'/>} value={this.state.nome} onChangeText={(nome) => this.setState({ nome})}/>
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Local' leftIcon={
              <Icon name='map-marker' size={24} color='white'/>} value={this.state.endereco} onChangeText={(endereco) => this.setState({ endereco})}/>
            </View>
            <View style={styles.input}>
              <Input underLineColorAndroid={'transparent'} placeholderTextColor='white' placeholder='Descrição' leftIcon={
              <Icon name='font' size={24} color='white'/>} value={this.state.descrição} onChangeText={(descrição) => this.setState({ descrição})}/>
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
                      <CheckBox title='Rock' checkedIcon='check-square' checkedColor='green' checked={this.state.rock} onPress={() => this.setState({rock: !this.state.rock})}/>
                      <CheckBox title='Sertanejo' checkedIcon='check-square' checkedColor='green' checked={this.state.sertanejo} onPress={() => this.setState({sertanejo: !this.state.sertanejo})}/>
                      <CheckBox title='Pagode' checkedIcon='check-square' checkedColor='green' checked={this.state.pagode} onPress={() => this.setState({pagode: !this.state.pagode})}/>
                      <CheckBox title='Samba' checkedIcon='check-square' checkedColor='green' checked={this.state.samba} onPress={() => this.setState({samba: !this.state.samba})}/>
                      <CheckBox title='Eletro' checkedIcon='check-square' checkedColor='green' checked={this.state.eletro} onPress={() => this.setState({eletro: !this.state.eletro})}/>
                      <CheckBox title='Funk' checkedIcon='check-square' checkedColor='green' checked={this.state.funk} onPress={() => this.setState({funk: !this.state.funk})}/>
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
        <View style = {styles.teste}>
          <View style={styles.button}>
            <View style={styles.inputText}> 
                <Text>
                  {this.state.dataInicio}
                </Text>
              </View>
            <ThemeProvider theme={themeButton}>
              <Button raised title="Escolha a data de inicio" onPress={this.showDatePicker1} titleStyle={{ color: 'black' }} />
              <DateTimePicker isVisible={this.state.isDateVisible1} onConfirm={this.handleDatePicker1} onCancel={this.hideDatePicker1} mode={'date'} minimumDate={d}/>
            </ThemeProvider>
          </View>
          <View style={styles.button}>
          <View style={styles.inputText}> 
              <Text>
                {this.state.dataFim}
              </Text>
            </View>
            <ThemeProvider theme={themeButton}>
              <Button raised title="Escolha a data de termino" onPress={this.showDatePicker2} titleStyle={{ color: 'black' }} />
              <DateTimePicker isVisible={this.state.isDateVisible2} onConfirm={this.handleDatePicker2} onCancel={this.hideDatePicker2} mode={'date'} minimumDate={d}/>
            </ThemeProvider>
          </View>
          <View style={styles.button}>
          <View style={styles.inputText}> 
              <Text>
                {this.state.horarioInicio}
              </Text>
            </View>
            <ThemeProvider theme={themeButton}>
              <Button raised title="Escolha a hora de inicio" onPress={this.showTimePicker1} titleStyle={{ color: 'black' }} />
              <DateTimePicker isVisible={this.state.isTimeVisible1} onConfirm={this.handleTimePicker1} onCancel={this.hideTimePicker1} mode={'time'} />
            </ThemeProvider>
          </View>
          <View style={styles.button}>
            <ThemeProvider theme={themeButton}>
            <View style={styles.inputText}> 
              <Text>
                {this.state.horarioFim}
              </Text>
            </View>
              <Button raised title="Escolha a hora de termino" onPress={this.showTimePicker2} titleStyle={{ color: 'black' }} />
              <DateTimePicker isVisible={this.state.isTimeVisible2} onConfirm={this.handleTimePicker2} onCancel={this.hideTimePicker2} mode={'time'} />
            </ThemeProvider>
          </View>
        </View>
          <View style={styles.button}>
            <ThemeProvider theme={theme}>
              <Button raised title='Mudar Foto' titleStyle={{ color: 'black' }} onPress={() => this.pickSingle(true)}/>
            </ThemeProvider>
          </View>
          <View style={styles.button2}>
            <ThemeProvider theme={theme}>
              <Button raised title='Confirmar' titleStyle={{ color: 'black' }} onPress={() => this.alert()}/>
            </ThemeProvider>
          </View>
        </View>
        </ScrollView>
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
      paddingLeft: 50,
      paddingRight: 50,
    },
    overlayButton: {
      marginTop: 5,
      marginBottom: 5,
      paddingLeft: 70,
      paddingRight: 70,
    },
    inputText: {
      borderRadius: 15,
      backgroundColor: '#00bfff',
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 5
    },
    header:{
      backgroundColor: '#1e90ff'
    },
    button2: {
      marginTop: 20,
      paddingLeft: 50,
      paddingRight: 50,
      marginBottom: 10
    },
    teste : {
      height: 350
    }
  });
import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Image, Alert, NativeModules, Dimensions} from 'react-native';
import { Input, Button, ThemeProvider, Text, Icon} from 'react-native-elements';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title } from 'native-base'

const nome = require('./cadastroEventoPage1');
const categorias = require('./cadastroEventoPage2');
const descricao = require('./cadastroEventoPage3');
const dataInicio = require('./cadastroEventoPage4');
const dataFim = require('./cadastroEventoPage4');
const horarioInicio = require('./cadastroEventoPage4');
const horarioFim = require('./cadastroEventoPage4');
const endereco = require('./cadastroEventoPage5');
const local = require('./mapaCriarEvento');

var ImagePicker = NativeModules.ImageCropPicker;

const theme = {
  colors: {
    primary: 'black'
  }
}

const themeButton = {
  colors: {
    primary: '#1e90ff'
  }
}

export default class cadastroEventoPage6 extends Component{  
  state = {
    image: null,
  }

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
      Alert.alert('Não foi selecionado uma imagem para o evento');
    });
}

renderImage(image) {
    return <View style={styles.teste}>
    <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    </View>
}

renderIcon(){
  return <View style={styles.teste}>
    <Icon name='image' type='font-awesome' size={120} color={"#1e90ff"} />
  </View>
}


async criarEvento(){
  const key = await firebase.database().ref('/eventos/').push().key;
  const storage = firebase.storage();
  const imageRef = storage.ref('eventos').child(`${key}`);
  const img = await imageRef.putFile(this.state.image.uri);
  const user = await firebase.auth().currentUser;
  if(endereco.endereco == null){
    var address = local;
  }
  else{
    var address = endereco;
  }
  await firebase.database().ref('/eventos/'+key).set({
    nome: nome.nome,
    descrição: descricao.descricao,
    categorias: categorias.categorias,
    dataInicio: dataInicio.dataInicio,
    dataFim: dataFim.dataFim,
    horarioInicio: horarioInicio.horarioInicio,
    horarioFim: horarioFim.horarioFim,
    endereco: address.endereco.endereco,
    latitude: address.endereco.latitude,
    longitude: address.endereco.longitude,
    imageUrl: img.downloadURL,
    proprietario: user.uid,
    key: key,
    confirmados: 0
  })
  Alert.alert(
    "Criar evento",
    "Evento criado com sucesso!",
    [
        { text: "OK", onPress: () => this.props.navigation.navigate('Home') },
    ],);
}

verificaIsNull(){
    if(this.state.image){
      this.criarEvento();
    }
    else{
            Alert.alert(
                "Criar evento",
                "Por favor, insira uma imagem",
                [
                    { text: "OK", onPress: () =>  null },
                ],);
    }
    }
    alert(){
      Alert.alert(
          "Deseja retornar a Home?",
          "Todo seu progresso de criação de evento sera perdido",
          [
              { text: "Não", onPress: () =>  null },
              { text: "Sim", onPress: () => this.props.navigation.navigate('Home')},
              
          ],);
}

  render() {
    return (
      <View style={styles.container}>
          <Header androidStatusBarColor="#1e90ff" style={styles.header}>
            <Left>
              <Icon size={24} type='font-awesome' color='white' name='arrow-left' onPress={() => this.alert()} hasTabs/>
            </Left>
            <Body>
            <Title> Criar Evento </Title>
            </Body>
          </Header>
        <View style={styles.containerImagem}>
          <ScrollView>
          {this.state.image ? this.renderImage(this.state.image) : this.renderIcon()}
          </ScrollView>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: '#1e90ff'}}>
            Carregue a foto do seu evento
          </Text>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
          <Button onPress={() => this.pickSingle(true)} buttonStyle={{width: 60, height: 45}} icon={<Icon name='upload' type='font-awesome' size={20} color="white" />} />
        </ThemeProvider>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button onPress={() => this.verificaIsNull()} buttonStyle={{width: 60, height: 45}} icon={<Icon name='check' type='material' size={20} color="white" />} />
        </ThemeProvider>
        </View>
    </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  containerImagem:{
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
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
  teste : {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header:{
    backgroundColor: '#1e90ff'
  }
});
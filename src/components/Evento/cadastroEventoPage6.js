import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Image, Alert, NativeModules, Dimensions} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import {Left, Body, Header, Title } from 'native-base'

const nome = require('./cadastroEventoPage1');
const categorias = require('./cadastroEventoPage2');
const descricao = require('./cadastroEventoPage3');
const dataInicio = require('./cadastroEventoPage4');
const dataFim = require('./cadastroEventoPage4');
const horarioInicio = require('./cadastroEventoPage4');
const horarioFim = require('./cadastroEventoPage4');
const endereco = require('./mapaCriarEvento');

var ImagePicker = NativeModules.ImageCropPicker;

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
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
}

renderImage(image) {
    return <View style={styles.teste}>
    <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    </View>
}

renderIcon(){
  return <View style={styles.teste}>
    <Icon name='image' size={120} color={"white"} />
  </View>
}


async criarEvento(){
  const key = await firebase.database().ref('/eventos/').push().key;
  const storage = firebase.storage();
  const imageRef = storage.ref('eventos').child(`${key}`);
  const img = await imageRef.putFile(this.state.image.uri);
  const user = await firebase.auth().currentUser;
  await firebase.database().ref('/eventos/'+key).set({
    nome: nome.nome,
    descrição: descricao.descricao,
    categorias: categorias.categorias,
    dataInicio: dataInicio.dataInicio,
    dataFim: dataFim.dataFim,
    horarioInicio: horarioInicio.horarioInicio,
    horarioFim: horarioFim.horarioFim,
    endereco: 'em devolvimento',
    latitude: endereco.local.latitude,
    longitude: endereco.local.longitude,
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
          <Text h4 style={{ color: theme.colors.primary }}>
            Carregue a foto do seu evento
          </Text>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Escolher Foto' titleStyle={{ color: 'black' }} onPress={() => this.pickSingle(true)}/>
        </ThemeProvider>
        </View>
        <View style={styles.button}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Criar Evento' titleStyle={{ color: 'black' }} onPress={() => this.verificaIsNull()}/>
        </ThemeProvider>
        </View>
    </View>
  );
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
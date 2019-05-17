import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Image, NativeModules, Dimensions} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';

const nome = require('./cadastroEventoPage1');
const categorias = require('./cadastroEventoPage2');
const descricao = require('./cadastroEventoPage3');
const dateTime = require('./cadastroEventoPage4');
const endereco = require('./cadastroEventoPage5');

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

export default class App extends Component{

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
  const storage = firebase.storage();
  const sessionId = new Date().getTime();
  const imageRef = storage.ref('eventos').child(`${sessionId}`);
  const img = await imageRef.putFile(this.state.image.uri);
  console.log(img);
  const user = await firebase.auth().currentUser;
  const key = await firebase.database().ref('/eventos/').push().key;
  firebase.database().ref('/eventos/'+key).set({
    nome: nome.nome,
    descrição: descricao.descricao,
    categorias: categorias.categorias,
    data: dateTime.data,
    horario: dateTime.horario,
    endereco: endereco.endereco,
    imageName: img.metadata.name,
    imageUrl: img.downloadURL,
    proprietario: user.uid,
    key: key
  })

}


  render() {
    return (
      <View style={styles.container}>
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
            <Button raised title='Criar Evento' titleStyle={{ color: 'black' }} onPress={() => this.criarEvento()}/>
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
  }
});
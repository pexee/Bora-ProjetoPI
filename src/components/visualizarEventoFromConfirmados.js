import React, {Component} from 'react';
import {StyleSheet, View, Alert, Image, TouchableOpacity} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import firebase from 'react-native-firebase';
import RNCalendarEvents from 'react-native-calendar-events';


const dados = require('./eventosConfirmados');
const user = require('./Home');
const storage = firebase.storage();


const theme = {
    colors: {
      primary: 'white'
    }
  }


export default class VisualizarEventoFromMeusEventos extends Component{  

    state = {

    }

    constructor(){
        super()
        if(user.user == dados.dados.proprietario){
            this.state = {
                bora: false,
                isProprietario: true,
            }
        }
        else{
            this.state = {
                bora: false,
                isProprietario: false,
            }
        }
        this.verificaStatus();
    }

    putButton(){
        return <ActionButton buttonColor='#00bfff'>
          <ActionButton.Item buttonColor='#90ee90' title="Editar" onPress={() => this.props.navigation.navigate('EditarEventoFromConfirmados')}>
            <Icon type='material' name="edit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='red' title="Excluir" onPress={() => this.alert()}>
            <Icon name="close" type='material' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

    }

    alert(){
            Alert.alert(
                "Excluir evento",
                "Deseja EXCLUIR o evento?",
                [
                    { text: "Não", onPress: () =>  null },
                    { text: "Sim", onPress: () => this.excluirEvento()},
                    
                ],);
    }

    Authorization(){
      RNCalendarEvents.authorizationStatus()
      this.Permission();
    }
  
    Permission(){
      RNCalendarEvents.authorizeEventStore()
      this.alertCalendar();
      }
  

    alertCalendar(){
      Alert.alert(
        "Calendario",
        "Adicionar a data do evento ao seu calendario?",
        [
            { text: "Não", onPress: () =>  null },
            { text: "Sim", onPress: () =>  this.AddCalendar() },
        ],);
    }

    AddCalendar(){
      var dataInicio = dados.dados.dataInicio,
      split = dataInicio.split('/');
      var aux = split[0]
      var dia = parseInt(aux)
      novadataInicio = split[2] + "-" +split[1]+"-";
      var horarioInicio = dados.dados.horarioInicio;
      split = horarioInicio.split(':');
      var aux = split[0]
      var horas = parseInt(aux)
      var minutos = split[1]
      horas = horas + 3
      if (horas > 24){
        var aux = horas - 24
        horas = aux
        dia = dia + 1
      }
      var stringStart = novadataInicio+dia+('T')+horas+(':')+minutos+(':00.000Z');
      console.log(stringStart)
      
      var dataFim = dados.dados.dataFim,
      split = dataFim.split('/');
      var aux = split[0]
      var dia = parseInt(aux)
      novadataFim = split[2] + "-" +split[1]+"-";
      var horarioFim = dados.dados.horarioFim;
      split = horarioFim.split(':');
      var aux = split[0]
      var horas = parseInt(aux)
      var minutos = split[1]
      horas = horas + 3
      if (horas > 24){
        var aux = horas - 24
        horas = aux
        dia = dia + 1
      }
      var stringEnd = novadataFim+dia+('T')+horas+(':')+minutos+(':00.000Z');
      console.log(stringEnd)
      RNCalendarEvents.saveEvent(dados.dados.nome, {
       calendarId: '3',
        startDate: stringStart,
        endDate: stringEnd,
        location: dados.dados.endereco
  })
      Alert.alert(
        "Calendario",
        "Data adicionada com sucesso!",
        [
            { text: "OK", onPress: () =>  null },
        ],);
    }

    async excluirEvento(){
        await firebase.database().ref('/usuarios/').once('value',function(snapshot1){
          snapshot1.forEach(function(childSnapshot1){
            firebase.database().ref('/usuarios/' + childSnapshot1.key + '/eventos/').once('value', function(snapshot2){
              snapshot2.forEach(function(childSnapshot2){
                if(childSnapshot2.key == dados.dados.key && childSnapshot2.val() == true){
                  firebase.database().ref('/usuarios/' + childSnapshot1.key + '/eventos/' + childSnapshot2.key).remove();
                }
              });
            });
          });
        });
        var imageRef = storage.ref('eventos').child(dados.dados.key);
        await imageRef.delete();
        await firebase.database().ref('/eventos/' + dados.dados.key).remove();
          Alert.alert(
              "Excluir evento",
              "Evento excluido com sucesso!",
              [
                  { text: "Ok", onPress: () =>  this.props.navigation.navigate('Home') },  
              ],);
    }

    async verificaStatus(){
      await firebase.database().ref('/usuarios/' + user.user + '/eventos/' + dados.dados.key).once('value').then(snapshot => {
        if(snapshot.val() != null){
          this.setState({bora: snapshot.val()});
        }
        else{
          firebase.database().ref('/usuarios/' + user.user + '/eventos/').update({
            [dados.dados.key]: false,
          })
          this.setState({bora: false});
        }
      });
    }

    async mudaStatus(){
      if(this.state.bora == true){

        Alert.alert(
                "Evento",
                "Você desconfirmou presença no evento, bora?",
                [
                    { text: "OK", onPress: () =>  null },
                ],);

        this.setState({bora: false});
        await firebase.database().ref('/eventos/' + dados.dados.key + '/confirmados/').transaction(function(confirmados){
          confirmados--;
          return confirmados;
        });
        await firebase.database().ref('/usuarios/' + user.user + '/eventos/').update({
          [dados.dados.key]: false,
        });
      }
      else{

        Alert.alert(
                "Evento",
                "Você confirmou presença no evento, bora!",
                [
                    { text: "OK", onPress: () =>  null },
                ],);
        
         this.setState({bora: true});
         await firebase.database().ref('/eventos/' + dados.dados.key + '/confirmados/').transaction(function(confirmados){
          confirmados++;
          return confirmados;
        });
         await firebase.database().ref('/usuarios/' + user.user + '/eventos/').update({
          [dados.dados.key]: true,
        });
      }
    }

    verificaBora(){
      if(this.state.bora == true){
        return  <View style={styles.confirmButton}>
                  <View style={styles.buttonLeft}>
                    <TouchableOpacity style={styles.roundButton}>
                      <Icon name='done' type='material' size={24} color='#1e90ff' onPress={() => this.mudaStatus()} /> 
                    </TouchableOpacity>
                  </View>
                <Text>     Bora! </Text>
                </View>
      }
      else{
        return  <View style={styles.confirmButton}>
                  <View style={styles.buttonLeft}>
                    <TouchableOpacity style={styles.roundButton}>
                      <Icon name='flag' type='material' size={24} color='#1e90ff' onPress={() => this.mudaStatus()} /> 
                    </TouchableOpacity>
                  </View>
                <Text>     Bora? </Text>
                </View>
      }
    }

  render() {
    return (
        <View style={styles.containerPrincipal}>
                <Image source={{uri: dados.dados.imageUrl}} style={{height: 180,width: null, flex: 1}}/>
            <View style={styles.nome}>
                <Text h4 style={{color: 'white'}}>  {dados.dados.nome}</Text>
            </View>
            <View style={styles.horario}>
                <View style={styles.iconCalendar}>
                  <View style={styles.buttonLeft2}>
                  <TouchableOpacity style={styles.roundButton}>
                    <Icon onPress={() => this.Authorization()} name='event' type='material' size={24} color='#1e90ff'/>
                  </TouchableOpacity>
                    </View>
                    <Text> {dados.dados.dataInicio} </Text>
                </View>
                    {this.verificaBora()}
                <View style={styles.iconClock}>
                    <TouchableOpacity style={styles.roundButton}>
                      <Icon name='alarm' type='material' size={24} color='#1e90ff'/>
                    </TouchableOpacity>
                    <Text> {dados.dados.horarioInicio} </Text>
                </View>
            </View>
            <View style={styles.desc}>
                <Text style={{color:'white'}}> {dados.dados.descrição} </Text>
            </View>
            <View style={styles.local}>
                <TouchableOpacity style={styles.roundButton}>
                <Icon onPress={() => this.props.navigation.navigate('MapaVisualizarConfirmados')} name='map-marker' type='font-awesome' size={24} color='#1e90ff'/>
                </TouchableOpacity>
                <Text> {dados.dados.endereco} </Text>
            </View>
                {this.state.isProprietario ? this.putButton() : null}
        </View>
  );
  }
}

const styles = StyleSheet.create({
    containerPrincipal: {
        flex: 1,
    },
    image: {
        width: 380,
        height: 180,
    },
    logoContainer: {
        alignItems: 'center',
    },
    nome: {
        backgroundColor: '#1e90ff',
        height: 40, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center', 
    },  
    desc: {
        backgroundColor: '#1e90ff',
        height: 80, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center', 
    },
    horario: {
        backgroundColor: '#fff',
        height: 70, 
        color: '#fff',
        //borderWidth: 1,
        //borderColor: '#000000',
        flexDirection: 'row'
    },
    iconCalendar: {
        marginTop: 10,
        paddingLeft: 30,
        justifyContent: 'center',
        
    },
    actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
    iconClock: {
        marginTop: 10,
        paddingLeft: 60,
        justifyContent: 'center',
    },
    local: {
        backgroundColor: '#fff',
        height: 80, 
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        //borderColor: '#000000', 
    },
    header:{
      backgroundColor: '#1e90ff'
    },
    confirmButton: {
      marginTop: 10,
      paddingLeft: 40,
      justifyContent: 'center',
    },
    roundButton: {
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width: 40,
      height: 40,
      backgroundColor:'#fff',
      borderRadius: 50,
    },
    buttonLeft : {
      paddingLeft: 14,
      justifyContent: 'center',
    },
    buttonLeft2 : {
      paddingLeft: 20,
      justifyContent: 'center',
    }
  });
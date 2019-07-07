import React, {Component} from 'react';
import {StyleSheet, View, Alert, ScrollView, Dimensions} from 'react-native';
import { Input, Button, ThemeProvider, Text, Icon} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import {Left, Body, Header, Title } from 'native-base'

var {height, width} = Dimensions.get('window');

const theme = {
  colors: {
    primary: '#1e90ff'
  }
}

const themeButton = {
  colors: {
    primary: '#1e90ff'
  }
}

var d = moment().toDate()
var dataatual = moment(d).format('DD/MM/YYYY')
var horaatual = moment(d).format('HH:MM')

export default class cadastroEventoPage4 extends Component{
    constructor(){
      super()
      this.state = {
        isDateVisible1: false,
        isDateVisible2: false,
        isTimeVisible1: false,
        isTimeVisible2: false,
        dataInicio: dataatual,
        data: d,
        dataFim: dataatual,
        horarioInicio: horaatual,
        horarioFim: horaatual,
      }
    }


    handleDatePicker1 = (date) => {
      var formatado = moment(date).format('DD/MM/YYYY');
      this.setState({
        isDateVisible1: false,
        dataInicio: formatado,
        data: date,
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

    verificaIsNull(){
    if(this.state.dataInicio && this.state.dataFim && this.state.horarioInicio && this.state.horarioFim){
      module.exports.dataInicio = this.state.dataInicio;
      module.exports.dataFim = this.state.dataFim;
      module.exports.horarioInicio = this.state.horarioInicio;
      module.exports.horarioFim = this.state.horarioFim;
      this.props.navigation.navigate('CadastroEventoPage5');
    }
    else{
            Alert.alert(
                "Criar evento",
                "Por favor, escolha uma data e um horario",
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
          <View style={styles.icon}>
          <Icon name='calendar' type='font-awesome' size={120} color={"#1e90ff"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: '#1e90ff' }}>
            Qual a data e hora do seu evento?
          </Text>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input placeholder={this.state.dataInicio + " as " + this.state.horarioInicio} editable={false} placeholderTextColor='#808080'/> 
            </View>
            <View style={styles.button}>
              <ThemeProvider theme={theme}>
                <Button buttonStyle={{width: 40, height: 45}} icon={<Icon name='event' type='material' size={20} color="white" />} onPress={this.showDatePicker1} />
                <DateTimePicker isVisible={this.state.isDateVisible1} onConfirm={this.handleDatePicker1} onCancel={this.hideDatePicker1} mode={'date'} minimumDate={d}/>
              </ThemeProvider>
            </View>
            <View style={styles.button}>
              <ThemeProvider theme={theme}>
                <Button buttonStyle={{width: 40, height: 45}} icon={<Icon name='alarm' type='material' size={20} color="white" />} onPress={this.showTimePicker1} />
                <DateTimePicker isVisible={this.state.isTimeVisible1} onConfirm={this.handleTimePicker1} onCancel={this.hideTimePicker1} mode={'time'} />
              </ThemeProvider>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.input}>
              <Input placeholder={this.state.dataFim + " as " + this.state.horarioFim} editable={false} placeholderTextColor='#808080'/> 
            </View>
            <View style={styles.button}>
              <ThemeProvider theme={theme}>
                <Button buttonStyle={{width: 40, height: 45}} onPress={this.showDatePicker2} icon={<Icon name='event' type='material' size={20} color="white" />} />
                <DateTimePicker isVisible={this.state.isDateVisible2} onConfirm={this.handleDatePicker2} onCancel={this.hideDatePicker2} mode={'date'} minimumDate={this.state.data}/>
              </ThemeProvider>
            </View>
            <View style={styles.button}>
              <ThemeProvider theme={theme}>
                <Button buttonStyle={{width: 40, height: 45}} onPress={this.showTimePicker2} icon={<Icon name='alarm' type='material' size={20} color="white" />} />
                <DateTimePicker isVisible={this.state.isTimeVisible2} onConfirm={this.handleTimePicker2} onCancel={this.hideTimePicker2} mode={'time'} />
              </ThemeProvider>
            </View>
          </View>
        <View style={styles.button2}>
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
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 15,
      backgroundColor: '#fff',
      width: (width-(width*0.33)),
    },
    button: {
      marginTop: 20,
      width: '15%',
      justifyContent: 'center', 
      alignItems: 'center',
      
    },
    button2: {
      marginTop: 10,
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 10
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
    header:{
      backgroundColor: '#1e90ff'
    },
    teste : {
      height: 350
    },
    inputText: {
      borderRadius: 15,
      backgroundColor: '#1e90ff',
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 5
    },
    inputContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'row',
    },
  });
import React, {Component} from 'react';
import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import { Input, Button, ThemeProvider, Text} from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import {Left, Body, Header, Title } from 'native-base'

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

var d = moment().toDate()


export default class cadastroEventoPage4 extends Component{
    constructor(){
      super()
      this.state = {
        isDateVisible1: false,
        isDateVisible2: false,
        isTimeVisible1: false,
        isTimeVisible2: false,
        dataInicio: null,
        dataFim: null,
        horarioInicio: null,
        horarioFim: null,
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
          <Icon name='calendar' size={120} color={"white"}/>
        </View>
        <View style={styles.text}>
          <Text h4 style={{ color: theme.colors.primary }}>
            Qual a data e hora do seu evento?
          </Text>
        </View>
        <ScrollView>
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
          <View style={styles.inputText}> 
              <Text>
                {this.state.horarioFim}
              </Text>
            </View>
            <ThemeProvider theme={themeButton}>
              <Button raised title="Escolha a hora de termino" onPress={this.showTimePicker2} titleStyle={{ color: 'black' }} />
              <DateTimePicker isVisible={this.state.isTimeVisible2} onConfirm={this.handleTimePicker2} onCancel={this.hideTimePicker2} mode={'time'} />
            </ThemeProvider>
          </View>
        </View>
        </ScrollView>
        <View style={styles.button2}>
          <ThemeProvider theme={themeButton}>
            <Button raised title='Ok' onPress={()=> this.verificaIsNull()} titleStyle={{ color: 'black' }}/>
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
      justifyContent: 'center', 
      alignItems: 'center',
    },
    button: {
      marginTop: 20,
      paddingLeft: 70,
      paddingRight: 70,
    },
    button2: {
      marginTop: 10,
      paddingLeft: 70,
      paddingRight: 70,
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
      backgroundColor: '#00bfff',
      justifyContent: 'center', 
      alignItems: 'center',
      marginBottom: 5
    },
  });
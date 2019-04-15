import React, {Component} from 'react';
import {StyleSheet, 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  state = {
    email: '',
    password: ''
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={this.state.email}
          onChangeText={email => this.setState({email})}
          />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={this.state.password}
          onChangeText={password => this.setState({password})}
          />
        <TouchableOpacity style={styles.button} onPress={() => {}} >
         <Text style = {styles.buttonText}> Logar </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 50,
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    height: 45,
    backgroundColor: '#069',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  image: {
    width: 180,
    height: 180,
  }
});

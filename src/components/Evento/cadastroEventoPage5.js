import React, {Component} from 'react';
import { View, Button, Text } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class App extends Component{
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button 
        title="Imagem:"
      />
    </View>
  );
  }
}
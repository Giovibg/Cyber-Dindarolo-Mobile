import React, { Component } from 'react'
import APIrequest from './apiServices'
import { styles } from './styles/Style_Account';
import * as SecureStore from 'expo-secure-store'

import {
    TouchableOpacity,
    Text,
    TextInput,
    View
  } from "react-native";

  const getUsername = async () => {
    return await SecureStore.getItemAsync('username');
    };

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
        budget: 0.00,
        name:''
    };
    this.logOut = this.logOut.bind(this);
  }
  
  componentDidMount(){
    getUsername().then(username =>   {
        this.setState({name:username});
  })
}

async logOut() {
  try {
      const refresh_token = await SecureStore.getItemAsync('refresh_token');
      const response = await APIrequest.post('/jwt_auth/blacklist/', {
          refresh_token: refresh_token
      });
      APIrequest.defaults.headers['Authorization'] = null;
      this.props.action();
      return response
  } catch (error) {
      throw error;
  }
}

  render(){
    

    return(
        <View style={styles.container}>
          <Text style={styles.username}>{this.state.name}</Text>
          <View style={styles.centeredView}>
              <Text style={styles.textHigh}>Budget available: </Text>
              <Text style={styles.budget}>{this.props.budget} €</Text>
              <TouchableOpacity delayPressIn={0} onPress={() => this.logOut()}>
                  <Text style={styles.viewText}>Logout</Text>
              </TouchableOpacity>
          </View>
        </View>
    );
  }
}
Account.navigationOptions = screenProps => ({
  title: "Cyber Dindarolo",
  
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: '#181818'
    },
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24
  },
  
})
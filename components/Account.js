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
  }
  
  componentDidMount(){
    getUsername().then(username =>   {
        console.log("username:",username);
        this.setState({name:username});
  })
}
  
goOut()
{
    this.props.action();
}


  render(){
    

    return(
        <View>
        <Text style={styles.username}>{this.state.name}</Text>
        <View style={styles.centeredView}>
            
            <Text style={styles.textHigh}>Budget available: </Text>
            <Text style={styles.budget}>{this.props.budget} €</Text>
            <TouchableOpacity delayPressIn={0} onPress={() => this.goOut()}>
                    <Text style={styles.viewText}>Logout</Text>
            </TouchableOpacity>
        </View>
        
        </View>
    );
  }
}

import React, { Component } from 'react';
import APIrequest from './apiServices'
import { styles } from './styles/StyleLoginForm';
import {AsyncStorage}from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import {
    TextInput,
    Text,
    Button,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import { acc } from 'react-native-reanimated';

export default class Login extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors:{}
        }
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        try{
            await SecureStore.setItemAsync('access_token',"");
            await SecureStore.setItemAsync('refresh_token','');
            await SecureStore.setItemAsync('username',"");
            const response = await APIrequest.post('/api/token/',{
                username: this.state.username,
                password: this.state.password
            });
            APIrequest.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            await SecureStore.setItemAsync('access_token', response.data.access);
            await SecureStore.setItemAsync('refresh_token', response.data.refresh);
            await SecureStore.setItemAsync('username',this.state.username);
            const token = await SecureStore.getItemAsync('access_token');
            console.log("token ",token);
            this.props.navigation.navigate("Dashboard");
            return response
        }catch (error){
            this.setState({errors:error.response.data});
        }
    
    } 

    goRegister(){
        this.props.navigation.navigate("Register");
    }
    

    render() {
        
        
        return (
            <View style={styles.container}>
               
                
                <Text style={styles.textLogin}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Insert Username"
                    placeholderTextColor="#383838"
                    
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                    autoCapitalize={'none'}
                />
                 { this.state.errors.username ? <Text style={styles.error}>{this.state.errors.username }</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Insert Password"
                    placeholderTextColor="#383838"
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                />
                 { this.state.errors.password ? <Text style={styles.error}>{this.state.errors.password }</Text> : null}
                 { this.state.errors.detail ? <Text style={styles.error}>{this.state.errors.detail} </Text>: null}
                <TouchableOpacity style={styles.button} onPress={this.handleSubmit.bind(this)}>
                <Text> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.goRegister()}>
                    <Text style={styles.viewText}>SIGN UP</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

Login.navigationOptions = screenProps => ({
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
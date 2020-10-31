import React, { Component } from 'react';
import APIrequest from './apiServices'
import { styles } from './styles/StyleLoginForm';
import * as SecureStore from 'expo-secure-store'
import {
    TextInput,
    Text,
    View,
    TouchableOpacity
} from 'react-native';



export default class Register extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm_password:"",
            email:"",
            errors:{}
        };
    }
    

     
    async handleSubmit(event) {
        event.preventDefault();
        try{
            await SecureStore.setItemAsync('access_token',"");
            await SecureStore.setItemAsync('refresh_token','');
            await SecureStore.setItemAsync('username',"");
            const response =  await APIrequest.post('/jwt_auth/register/', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password2:this.state.confirm_password
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


    

    render() {
          
        return (
            <View style={styles.container}>
                <Text style={styles.textLogin}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#888888"
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                    autoCapitalize={'none'}
                />
                { this.state.errors.username ? <Text style={styles.error}>{this.state.errors.username }</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888888"
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                    autoCapitalize={'none'}
                />
                { this.state.errors.email ? <Text style={styles.error}>{this.state.errors.email }</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888888"
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                />
                { this.state.errors.password ? <Text style={styles.error}>{this.state.errors.password }</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#888888"
                    onChangeText={text => this.setState({confirm_password: text})}
                    value={this.state.confirm_password}
                    secureTextEntry={true}
                    autoCapitalize={'none'}
                />
                { this.state.errors.password2 ? <Text style={styles.error}>{this.state.errors.password2 }</Text> : null}
                { this.state.errors.detail ? <Text style={styles.error}>{this.state.errors.detail} </Text>: null}

                <TouchableOpacity style={styles.button} onPress={this.handleSubmit.bind(this)}>
                    <Text style={styles.btn_text}> Register </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

Register.navigationOptions = screenProps => ({
    title: "Cyber Dindarolo",
    
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: '#181818'
      },
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    }
})
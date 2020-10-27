import React, { Component } from 'react';
import APIrequest from './apiServices'
import { styles } from './styles/Style_Transaction';
import RNPickerSelect from 'react-native-picker-select';
import { Keyboard } from 'react-native'
import NumericInput from 'react-native-numeric-input'

import {
    TextInput,
    Text,
    Button,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import { acc } from 'react-native-reanimated';



export default class Home extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          list_products:[],
          name_prod: '',
          quantity: 1,
          product_id: null,
          errors:{},
          product : '',
          message: {},
          update_budget: false,
          unit_price: 0.00,
          available: 0,
          label:''
        };

        this.getMessage = this.getMessage.bind(this);
        this.stateChange_p = this.stateChange_p.bind(this);
    } 
    async getMessage(){
        try {
            let response = await APIrequest.get('/api/products/');
            const message = response.data;
            this.setState({
                list_products: message,
            });
            
            return message;
        }catch(error){
           // console.log("Product error: ", JSON.stringify(error, null, 4));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        Keyboard.dismiss()
        this.setState({errors:{}})
        this.setState({message:{}})
        try {
                
                const response =  await APIrequest.put('/api/transactions/', {
                product: this.state.product_id,
                quantity:this.state.quantity
            });
            this.setState({message : response.data});
            this.setState({update_budget: true})
            this.props.action();
            return response;
        } catch (error) {
            console.log(error.response.data);
        this.setState({
            errors:error.response.data
        });
        }
    }

    componentDidMount(){
        
      this.getMessage();
    }
  setStat(){
    this.props.navigation.navigate("Login");
  }
  onChanged(text) {
    this.setState({
        quantity: text.replace(/[^0-9]/g, ''),
    });
    this.setState({errors:{}});
    this.setState({message:{}});
  }

  stateChange_p = product_name =>{
    console.log(product_name)
    this.setState({product_id:product_name.value})
    this.setState({unit_price:product_name.unit_price})
    this.setState({available:product_name.quantity})
    console.log("unit price", product_name.unit_price);
    console.log("quantity", product_name.quantity);
    this.setState({errors:{}})
    this.setState({message:{}})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textHigh}>Buy a Product</Text>
                <RNPickerSelect style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 120, margin:30}}
                placeholder={{
                    label: 'Choose product...',
                    value: this.state.product_id,
                    color: 'red',
                }}
                
            onValueChange={(value) => this.setState({product_id:value})}
            items={this.state.list_products.map(t=> ({value: t.id, label: t.name}))}
            value={this.state.product}
        />
        { this.state.errors.product ? <Text style={styles.error}>{this.state.errors.product}</Text>: null}
        <View style={styles.viewText}>
        <Text style={styles.label}>Quantity</Text>
            <NumericInput 
            value={this.state.quantity} 
            onChange={value => this.setState({quantity:value})} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={1}
            valueType='integer'
            rounded 
            minValue={1}
            initValue={1}
            
            textColor='white' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#1DB954' 
            leftButtonBackgroundColor='#B91D37'/>
        </View>
        <TouchableOpacity style={styles.button}  onPress={this.handleSubmit.bind(this)}>
            <Text> Buy </Text>
        </TouchableOpacity>
        { this.state.errors.message ? <Text style={styles.error}>{this.state.errors.message}</Text> : null}
        { this.state.message.message ? <Text style={styles.created}>{this.state.message.message}</Text> : null}
            </View>
        )
    }
}

Home.navigationOptions = screenProps => ({
    title: "Home",
    
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    }
})
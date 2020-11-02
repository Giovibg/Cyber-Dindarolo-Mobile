import React, { Component } from 'react';
import APIrequest from './apiServices'
import { styles } from './styles/Style_Transaction';
import RNPickerSelect from 'react-native-picker-select';
import { Keyboard, StyleSheet } from 'react-native'
import NumericInput from 'rn-numeric-input'
import {
    TextInput,
    Text,
    Button,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
export default class Home extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          list_products:[],
          quantity: 0,
          errors:{},
          product : '',
          message: {},
          update_budget: false,
          unit_price: 0.00,
        };

        this.getMessage = this.getMessage.bind(this);
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
                product: this.state.product.id,
                quantity:this.state.quantity
            });
            this.setState({message : response.data});
            this.setState({update_budget: true,
                product:'',
                quantity:0
            })
            this.props.action();
            return response;
        } catch (error) {
            //console.log(error.response.data);
            this.setState({
                errors:error.response.data
            });
        }
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getMessage();
            this.setState({errors:{}})
            this.setState({message:{}})
            this.setState({unit_price:0.00, product: ''})
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
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

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.textHigh}>Buy a Product</Text>

                <RNPickerSelect style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 20,
                    right: 10,
                  },
                  placeholder: {
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 'bold',

                  },
                }}
                placeholder={{
                    label: 'Choose product...',
                    value: this.state.product,
                    color: 'red',
                }}
                onValueChange={(value) => this.setState({product:value})}
                items={this.state.list_products.map(t=> ({value: t, label: t.name}))}
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
                    borderColor='#484848'
                    textColor='white' 
                    iconStyle={{ color: 'white' }} 
                    rightButtonBackgroundColor='#1DB954' 
                    leftButtonBackgroundColor='#B91D37'/>

                    { this.state.errors.quantity ? <Text style={styles.error}>{this.state.errors.quantity}</Text> : null}
                    {this.state.product.unit_price > 0 && (
                    <Text style={styles.btn_text}>{this.state.product.unit_price} € / each</Text>
                    )}
                    {this.state.product.quantity > 0 && (<Text style={styles.btn_text}>{this.state.product.quantity} pcs available</Text>)}
                    {this.state.product.quantity == 0 && ( <Text style={styles.btn_text}>Out of Stock</Text>)}
                </View>

                <TouchableOpacity style={styles.button}  onPress={this.handleSubmit.bind(this)}>
                    <Text style={styles.btn_text}> Buy </Text>
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
const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'white',
      borderRadius: 8,
      color: 'red',
      backgroundColor:'#181818',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
import React, { Component } from 'react'
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
  } from "react-native";
import { styles } from './styles/Style_AddProduct';
import APIrequest from './apiServices'
import NumericInput from 'react-native-numeric-input'

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name_prod: '',
        description: '',
        quantity: 0,
        unit_price: 0.00,
        errors:{},
        message: {},
        visible:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  componentDidMount(){
    this.setState({visible : true});
  }

  handleClick = () => { 
    this.setState({
        
        visible: false
    });
    this.props.action();
    }


    async handleSubmit(event) {
        event.preventDefault();
        this.setState({errors:{}})
        this.setState({message:{}})
        try {
            const response =  await APIrequest.put('/api/products/', {
            name: this.state.name_prod,
            description: this.state.description,
            unit_price: this.state.unit_price,
            quantity: this.state.quantity
        });
        
        this.setState({message : response.data});
        this.setState({quantity : 0});
        this.setState({unit_price : 0.00});
        return response;
    } catch (error) {
        console.log("error insert:",error.response);
    this.setState({
        errors:error.response.data
    });
    }
    
    }

  render(){
    

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.visible}
        
      >
        <TouchableWithoutFeedback onPress={this.handleClick}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
        <Text style={styles.textLogin}>Add Product</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#383838"
                    onChangeText={text => this.setState({name_prod: text})}
                    value={this.state.name_prod}
                    autoCapitalize={'none'}
                />
                 { this.state.errors.name ? <Text style={styles.error}>{this.state.errors.name }</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    placeholderTextColor="#383838"
                    onChangeText={text => this.setState({description: text})}
                    value={this.state.description}
                    autoCapitalize={'none'}
                />
                { this.state.errors.description ? <Text style={styles.error}>{this.state.errors.description }</Text> : null}
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

                        textColor='white' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#1DB954' 
                        leftButtonBackgroundColor='#B91D37'/>
                        { this.state.errors.quantity ? <Text style={styles.error}>{this.state.errors.quantity }</Text> : null}
                    </View>
                    <View style={styles.viewText}>
                    <Text style={styles.label}>Unit Price</Text>
                        <NumericInput 
                        value={this.state.unit_price} 
                        onChange={value => this.setState({unit_price:value})} 
                        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                        totalWidth={240} 
                        totalHeight={50} 
                        iconSize={25}
                        step={0.01}
                        valueType='real'
                        rounded 
                        
                        textColor='white' 
                        iconStyle={{ color: 'white' }} 
                        rightButtonBackgroundColor='#1DB954' 
                        leftButtonBackgroundColor='#B91D37'/>
                        { this.state.errors.unit_price ? <Text style={styles.error}>{this.state.errors.unit_price }</Text> : null}
                    </View>
                 
                 
                <TouchableOpacity style={styles.button} onPress={this.handleSubmit.bind(this)}>
                <Text> Add Product </Text>
                </TouchableOpacity>
                { this.state.errors.detail ? <Text style={styles.error}>{this.state.errors.detail} </Text>: null}
                { this.state.message.message ? <Text style={styles.created}>{this.state.message.message}</Text> : null}
                
        </View>

      </Modal>

    );
  }
}

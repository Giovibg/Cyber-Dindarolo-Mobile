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
  import { Table, Row, Rows } from 'react-native-table-component';
import { styles } from './styles/Style_HistoryDetail';
import APIrequest from './apiServices'
import NumericInput from 'react-native-numeric-input'

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
        visible:false
    };
  }
    
  componentDidMount(){
    this.setState({visible : true});
  }

  handleClick = () => { 
        console.log("visible",this.state.visible)
    this.setState({
        
        visible: false
    });
    this.props.action();
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
        <Text style={styles.nameProd}>{this.props.transact.product_name}</Text>
        <View
  style={{
    borderWidth: 0.5,
        borderColor:'grey',
        margin:10,
        width:'90%'
  }}
/>
        <Text style={styles.modalText}>Quantity: {this.props.transact.quantity} pcs </Text>
        <Text style={styles.modalText}>Unit Price: {(this.props.transact.unit_price).toFixed(2)} € </Text>
        
        <Text style={styles.modalText}>Date: {(this.props.transact.transaction_timestamp).substring(0, 10)} </Text>
        {this.props.transact.subtotal > 0 && (
                        <Text style={styles.sub_pos}> Subtotal: +{(this.props.transact.subtotal).toFixed(2)}€</Text>
                        )}
        {this.props.transact.subtotal < 0 && (
                        <Text style={styles.sub_neg}> Subtotal: {(this.props.transact.subtotal).toFixed(2)}€</Text>
                        )}
        </View>

      </Modal>

    );
  }
}

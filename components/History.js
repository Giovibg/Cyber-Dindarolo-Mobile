import React, { Component,  useState  } from 'react';
import APIrequest from './apiServices'
import { FlatList, RefreshControl } from 'react-native'
import { styles } from './styles/Style_History';
import {
    TextInput,
    Text,
    Button,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import HistoryDetail from './HistoryDetail'

export default class Products extends Component  {
    constructor(props) {
        
        super(props);
        this.state = {
            transactions:[],
            single_transaction: {},
            detail : false,
            refreshing: false
        };

        this.getMessage = this.getMessage.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        
    } 

   
    
    async getMessage(){
        try {
            let response = await APIrequest.get('/api/transactions/');
            const message = response.data;
            this.setState({
                transactions: message,
                refreshing:false
            });
            
            return message;
        }catch(error){
           // console.log("Product error: ", JSON.stringify(error, null, 4));
        }
    }

    
    componentDidMount(){
        
      this.getMessage();
    }
    
 
    handleClick = (item) => {
        this.setState({
            single_transaction: item,
            detail: !this.state.detail
        });
    }

    changeStatus(){
        this.setState({
          detail: false
        })
        
      }

    onRefresh = () => {
        //Clear old data of the list
        this.setState({
            transactions: []
          })
        //Call the Service to get the latest data
        this.getMessage();
      };
    

    render() {
        const renderItem = ({ item }) => (
            <View style={styles.render}>
                <View style={styles.item}>
                    <TouchableOpacity delayPressIn={0} underlayColor={'red'} onPress={() => this.handleClick(item)}>
                        <Text style={styles.title2}>Date: {(item.transaction_timestamp).substring(0, 10)}</Text>
                        <Text style={styles.title}>{item.product_name}</Text>
                        
                        {item.subtotal > 0 && (
                        <Text style={styles.sub_pos}> Subtotal: +{(item.subtotal).toFixed(2)}€</Text>
                        )}
                        {item.subtotal < 0 && (
                        <Text style={styles.sub_neg}> Subtotal: {(item.subtotal).toFixed(2)}€</Text>
                        )}
                    </TouchableOpacity>
                </View>  
            </View>
          );
        return (
            <View style={styles.container}>
                <Text style={styles.textHigh}>History</Text>
                <FlatList
                data={this.state.transactions}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }
                />     
                {this.state.detail ? <HistoryDetail action={this.changeStatus} transact={this.state.single_transaction}/> : null}   
            </View>
        )
    }
}

Products.navigationOptions = screenProps => ({
    title: "Home",
    
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    }
})

    
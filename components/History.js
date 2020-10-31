import React, { Component} from 'react';
import APIrequest from './apiServices'
import { FlatList, RefreshControl } from 'react-native'
import { styles } from './styles/Style_History';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import HistoryDetail from './HistoryDetail'

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  
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
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getMessage();
          });
    }
    
    componentWillUnmount() {
        this._unsubscribe();
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
            refreshing:true
          })
          this.getMessage();
        //Call the Service to get the latest data
        
        wait(2000).then(() => {
            
            this.setState({refreshing:false})

        });    
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

    
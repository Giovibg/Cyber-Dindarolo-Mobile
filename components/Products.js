import React, { Component,  useState  } from 'react';
import APIrequest from './apiServices'
import { FlatList, RefreshControl } from 'react-native'
import { styles } from './styles/Style_Products';
import AddProduct from './AddProduct'
import {
    TextInput,
    Text,
    Button,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';
import { FAB } from 'react-native-paper';


const Item = ({ title }) => (
    <View style={styles.item}>
        
      <Text style={styles.title}>{title.name}</Text>
      <Text style={styles.title2}>Available: {title.quantity}pcs at {title.unit_price}€/each</Text>
      
    </View>
  );

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
export default class Products extends Component  {
    constructor(props) {
        
        super(props);
        this.state = {
          list_products:[],
          create: false,
          refreshing: false
        };

        this.getMessage = this.getMessage.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        
    } 
    
    async getMessage(){
        try {
            let response = await APIrequest.get('/api/products/');
            const message = response.data;
            this.setState({
                refreshing: false,
                list_products: message
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
 
    handleClick = () => { 
        this.setState({
            
            create: !this.state.create
        });
        console.log("create:",this.state.create)
    }

    changeStatus(){
        this.setState({
          create: false
        })
        //Update list
        this.getMessage();

        //Update budget
        this.props.action()

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
            <View>
            <Item title={item} />
            </View>
          );
        return (
            <View style={styles.container}>
                <Text style={styles.textHigh}>Products Available</Text>
                <FlatList
                data={this.state.list_products}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />
                }
                />        
                
                <FAB style={styles.fab} medium icon="plus" onPress={this.handleClick} />
                {this.state.create ? <AddProduct action={this.changeStatus} /> : null}
            </View>
            
        )
    }
}

Products.navigationOptions = screenProps => ({
  title: "Products",
  
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: '#181818'
    },
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24
  },
  
})

    
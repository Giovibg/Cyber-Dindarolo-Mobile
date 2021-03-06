import * as React from 'react';
import {Component} from 'react';
import { Text, View } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons
} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import History from './History';
import Products from './Products';
import Account from './Account';
import APIrequest from './apiServices'


const Tab = createBottomTabNavigator();



export default class Dashboard extends Component{
  constructor(props) {
        super(props);

        this.state = {
          budget: 0.00,
          username: ''
        };

        this.getMessage = this.getMessage.bind(this);
        this.goOut = this.goOut.bind(this);
    } 

    async getMessage(){
        try {
            let response = await APIrequest.get('/api/budget/');
            const message = response.data;
            this.setState({
                budget: message.budget,
            });
            return message;
        }catch(error){
         // console.log("Budget error: ", JSON.stringify(error, null, 4));
        
        }
    }

    goOut(){
        this.props.navigation.navigate("Login");
    }

    componentDidMount(){
        this.getMessage();
    }
    render(){
        return(            
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                      return(
                        <Ionicons
                        name={
                          focused
                            ? 'ios-home'
                            : 'ios-home'
                        }
                        size={size}
                        color={color}
                      />
                      );
                    } else if (route.name === 'Products') {
                      return(
                        <Ionicons
                          name={focused ? 'ios-list' : 'ios-list'}
                          size={size}
                          color={color}
                        />
                      );
                    }else if (route.name === 'History') {
                      return(
                        <FontAwesome
                          name={focused ? 'history' : 'history'}
                          size={size}
                          color={color}
                        />
                      );
                    }
                    else if (route.name === 'Account') {
                      return(
                        <MaterialIcons name="account-circle" size={size} color={color} />
                      )
                    }
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#e23656',
                  inactiveTintColor: 'grey',
                  activeBackgroundColor:'#181818',
                  inactiveBackgroundColor:'#181818'

                }}
            >
                <Tab.Screen name="Home" children={(props) =>  (<Home {...props} action={this.getMessage}/> )}/>
                <Tab.Screen name="Products" children={(props) => (<Products {...props} action={this.getMessage}/> )} />
                <Tab.Screen name="History" component={History} />
                <Tab.Screen name="Account"  children={() => (<Account budget={this.state.budget} action={this.goOut} update={this.getMessage}/> )} />
              </Tab.Navigator>
            </NavigationContainer>
            
        )
    }
}
Dashboard.navigationOptions = screenProps => ({
  title: "Dashboard",
  
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: '#181818'
    },
  headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 24
  }
})

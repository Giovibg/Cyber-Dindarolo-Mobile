import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Appearance, AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {decode, encode} from 'base-64'
import firebase from 'firebase';
import 'firebase/firestore'
import LinearGradient from 'react-native-linear-gradient';
if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }
const AppNavigator = createStackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  Dashboard:{screen: Dashboard}
})

const App = createAppContainer(AppNavigator);

export default App;



import React, {Component,useEffect} from 'react';

import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
const backgroundIg = require('./assets/splash.png');
import App from './src/App.js';



export default class RootApp extends Component { 

  render() {
    return (
     
    <App/>
     
    );
  }
}
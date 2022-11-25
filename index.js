/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store/configureStore';
import { View } from 'react-native-animatable';

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
   
    <App />
    
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);

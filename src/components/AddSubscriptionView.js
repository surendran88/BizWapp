import React from 'react';
import { StyleSheet, Text, View, ScrollView,ImageBackground,TouchableOpacity,Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';
import GlobalStyle from '../GlobalStyle';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
/**
 * The class renders a view with PaymentFormView
 */
// const backIg = require('../../assets/btn-back.png');
const backIg = require('./../../assets/btn-back.png');
const headerImage = require('./../../assets/top-bar.png');
export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <View style={GlobalStyle.container}>
        
      <View style={styles.subContainer}> 
      <View style={styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),color:'white',marginTop:responsiveHeight(1),fontFamily:'LakkiReddy'}}>Payment</Text></ImageBackground>          
        </View>
        <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>
              Try out full Stripe payment functionality in a React Native app
            </Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>
              Subscribe to see the magic number!
            </Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.infoText}>
              Subscription Plan: $10/month
            </Text>
          </View>
          <View style={styles.cardFormWrapper}>
            <PaymentFormView {...this.props}/>
          </View>
        </ScrollView>
        {/* Scrolls to the payment form */}
        <KeyboardSpacer
          onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
        />
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor : 'white',       
    marginTop:Platform.OS==='ios' ? responsiveHeight(4.2) :null
  },
  bgView:{
    height:responsiveHeight(10),
    width:responsiveWidth(100),
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  container: {
    flex: 1
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center'
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  }
});
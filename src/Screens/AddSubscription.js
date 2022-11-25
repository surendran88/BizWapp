import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import stripe from '@stripe/stripe-react-native'
import Button from '../components/Button'
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';

import axios from 'axios';
import Constant from '../redux/constants';
import Utils from '../Utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation';
import * as RNIap from 'react-native-iap';
import { TouchableOpacity } from 'react-native-gesture-handler';
const itemSkus = Platform.select({
  ios:{skus: [
    '10_mnth',
    '96_1year',
    
  ]},
  android:{skus: [
    '96_1year',
    '10_mnth',
  ]
}});
export default class CardFormScreen extends PureComponent {
  purchaseUpdateSubscription = null
  purchaseErrorSubscription = null
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
    first_name:'',
    last_name:'',
    plan_id:'',
    duration:'',
    payment_amount:'',
    email:'',
    password:'',
    type:''
  }
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
let {state}=this.props.navigation
this.state.first_name=state.params.first_name
this.state.last_name=state.params.last_name
this.state.email=state.params.email
this.state.password=state.params.password
this.state.plan_id=state.params.planId
this.state.duration=state.params.duration
this.state.payment_amount=state.params.price,
this.state.type=state.params.type
}
componentDidMount() {
  this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
    console.log('purchaseUpdatedListener', purchase);
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
      .then( async (deliveryResult) => {
        if (isSuccess(deliveryResult)) {
          // Tell the store that you have delivered what has been paid for.
          // Failure to do this will result in the purchase being refunded on Android and
          // the purchase event will reappear on every relaunch of the app until you succeed
          // in doing the below. It will also be impossible for the user to purchase consumables
          // again untill you do this.
          if (Platform.OS === 'ios') {
            await RNIap.finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            // If consumable (can be purchased again)
            await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
            // If not consumable
            await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
          }

          // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
          // If consumable (can be purchased again)
          await RNIap.finishTransaction(purchase, true);
          // If not consumable
          await RNIap.finishTransaction(purchase, false);
        } else {
          // Retry / conclude the purchase is fraudulent, etc...
        }
      });
    }
  });

  this.purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
    console.warn('purchaseErrorListener', error);
  });
}

componentWillUnmount() {
  if (this.purchaseUpdateSubscription) {
    this.purchaseUpdateSubscription.remove();
    this.purchaseUpdateSubscription = null;
  }
  if (this.purchaseErrorSubscription) {
    this.purchaseErrorSubscription.remove();
    this.purchaseErrorSubscription = null;
  }
}
purchase =()=> {
  this.requestPurchase(itemSkus[1])
}
requestPurchase = async (sku) => {
  try {
    await RNIap.requestPurchase(sku, false);
  } catch (err) {
    console.warn(err.code, err.message);
  }
}

requestSubscription = async (sku) => {
  try {
    await RNIap.requestSubscription(sku);
  } catch (err) {
    console.warn(err.code, err.message);
  }
}
  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: '',
            postalCode: '',
            email: '',
          },
        },
      })

      this.setState({ loading: false, token })
      if(token){
        if(this.state.type=='subscription'){
//           if(this.state.payment_amount<1.00){
// this.subscriptionFree(token.tokenId)
//           }else{
this.subscription(token.tokenId)
          // }
        }
        else{
          // if (this.state.payment_amount<1.00){
          //   this.SignUpFree(token.tokenId)
       
          // }
          // else{
            this.SignUp(token.tokenId)
          // }
        }
      }
    } catch (error) {
      this.setState({ loading: false })
    }
  }
  SignUp = (tok) =>{
    
   
      let params = {        
        'first_name': this.state.first_name,
        'last_name': this.state.last_name, 
        'email': this.state.email, 
        'password': this.state.password, 
        'plan_id': this.state.plan_id,
        'duration':this.state.duration,
        'payment_amount':this.state.payment_amount,
        'stripe_token':tok
      };
      axios.post(Constant.BASEURL + Constant.SIGNUP, params,Utils.postHeader()).
          then((res) => {
              this.setState({ isLoading: false });
              let data = res.data;
              if (data) {
                console.log(JSON.stringify(data))                                    
                  if (data){
                 if(data.result){
                   alert(data.message)
                  this.props.navigation.navigate('Login')
                 }
                 else{
                  alert(data.message)
                 }
                  }
              } else { 
                  Alert.alert('Message', 'Something went wrong please try again later', [{ text: 'OK' }], { cancelable: false });
              }
          }).catch((e) => {
              this.setState({ isLoading: false });
              try {
                  let errData = e.response.data;
                  let arrMsg = [];
                  arrMsg = errData.Messages;
                  let msg = "";
                  for(let i = 0; i < arrMsg.length; i++){
                    if (i===0){
                      msg = arrMsg[i]
                    }else{
                      msg = msg + "\n" + arrMsg[i]
                    }
                   
                  }
                 
                  
                    Alert.alert('Alert', msg, [{ text: 'OK' }], { cancelable: false });
                 
              } catch (e) { }

          });
      
    
  }
  SignUpFree = (tok) =>{
    
   
    let params = {        
      'first_name': this.state.first_name,
      'last_name': this.state.last_name, 
      'email': this.state.email, 
      'password': this.state.password, 
      'plan_id': this.state.plan_id,
      'duration':this.state.duration,
      'payment_amount':this.state.payment_amount,
      'stripe_token':tok
    };
    axios.post(Constant.BASEURL + Constant.SIGNUP_FREE, params,Utils.postHeader()).
        then((res) => {
            this.setState({ isLoading: false });
            let data = res.data;
            if (data) {
              console.log(JSON.stringify(data))                                    
                if (data){
               if(data.result){
                 alert(data.message)
                this.props.navigation.navigate('Login')
               }
               else{
                alert(data.message)
               }
                }
            } else { 
                Alert.alert('Message', 'Something went wrong please try again later', [{ text: 'OK' }], { cancelable: false });
            }
        }).catch((e) => {
            this.setState({ isLoading: false });
            try {
                let errData = e.response.data;
                let arrMsg = [];
                arrMsg = errData.Messages;
                let msg = "";
                for(let i = 0; i < arrMsg.length; i++){
                  if (i===0){
                    msg = arrMsg[i]
                  }else{
                    msg = msg + "\n" + arrMsg[i]
                  }
                 
                }
               
                
                  Alert.alert('Alert', msg, [{ text: 'OK' }], { cancelable: false });
               
            } catch (e) { }

        });
    
  
}

subscriptionFree =async(tok) =>{
    
   
  const value = await AsyncStorage.getItem('userId')
if(value !== null) {
let userId=value

  let params = {        
    'user_id': value, 
    'plan_id': this.state.plan_id,
    'duration':this.state.duration,
    'payment_amount':this.state.payment_amount,
    'stripe_token':tok
  };

  axios.post(Constant.BASEURL + Constant.BUY_SUBSCRIPTION_FREE, params,Utils.postHeader()).
      then((res) => {
          this.setState({ isLoading: false });
          let data = res.data;
          if (data) {
            console.log(JSON.stringify(data))                                    
              if (data){
                if (data.result){
               alert(data.message)
               this.props.navigation.navigate('Home')
                }
            
              else{
                alert(data.message)
              }
             
              
              }
          } else { 
              Alert.alert('Message', 'Something went wrong please try again later', [{ text: 'OK' }], { cancelable: false });
          }
      }).catch((e) => {
          this.setState({ isLoading: false });
          try {
              let errData = e.response.data;
              let arrMsg = [];
              arrMsg = errData.Messages;
              let msg = "";
              for(let i = 0; i < arrMsg.length; i++){
                if (i===0){
                  msg = arrMsg[i]
                }else{
                  msg = msg + "\n" + arrMsg[i]
                }
               
              }
             
              
                Alert.alert('Alert', msg, [{ text: 'OK' }], { cancelable: false });
             
          } catch (e) { }

      });
  
    }
}
  subscription =async(tok) =>{
    
   
    const value = await AsyncStorage.getItem('userId')
  if(value !== null) {
let userId=value
  
    let params = {        
      'user_id': value, 
      'plan_id': this.state.plan_id,
      'duration':this.state.duration,
      'payment_amount':this.state.payment_amount,
      'stripe_token':tok
    };
  
    axios.post(Constant.BASEURL + Constant.BUY_SUBSCRIPTION, params,Utils.postHeader()).
        then((res) => {
            this.setState({ isLoading: false });
            let data = res.data;
            if (data) {
              console.log(JSON.stringify(data))                                    
                if (data){
                  if (data.result){
                 alert(data.message)
                 this.props.navigation.navigate('Home')
                  }
              
                else{
                  alert(data.message)
                }
               
                
                }
            } else { 
                Alert.alert('Message', 'Something went wrong please try again later', [{ text: 'OK' }], { cancelable: false });
            }
        }).catch((e) => {
            this.setState({ isLoading: false });
            try {
                let errData = e.response.data;
                let arrMsg = [];
                arrMsg = errData.Messages;
                let msg = "";
                for(let i = 0; i < arrMsg.length; i++){
                  if (i===0){
                    msg = arrMsg[i]
                  }else{
                    msg = msg + "\n" + arrMsg[i]
                  }
                 
                }
               
                
                  Alert.alert('Alert', msg, [{ text: 'OK' }], { cancelable: false });
               
            } catch (e) { }

        });
    
      }
}
  render() {
    const { loading, token } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => console.log('hello')} style={{height:responsiveHeight(5),width:responsiveWidth(20),backgroundColor:'red'}}><Text>pay</Text></TouchableOpacity>
        {/* <Text style={styles.header}>
          Card Form Example
        </Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
          
        />
        <View
          style={styles.token}
          >
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})

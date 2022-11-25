import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, Alert, ScrollView } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Emailvalidator from '../Login/Emailvalidator';
import * as signupActions from './../../redux/actions/signupActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation';
import axios from 'axios';
import Utils from '../../Utils/utils';
import Constant from './../../redux/constants';
// import * as RNIap from 'react-native-iap';


import * as RNIap from 'react-native-iap';
// import console = require('console');
// const backgroundBlackIg = require('../../assets/bg2.png');
//const openSans = require('../../../assets/Fonts/OpenSans-Italic.ttf')
const backgroundIg = require('../../../assets/login-bg.png');
const LogoImage = require('../../../assets/logo.png');
const backImage = require('../../../assets/btn-back.png');
const selectTickImage = require('../../../assets/select-tick.png');
const radioOffImage = require('../../../assets/radio-off.png');
const radioOnImage = require('../../../assets/radio-on.png');
const rememberToggledOffImage = require('../../../assets/toggle-off.png');
const blueBackground = require('../../../assets/Asset.png');



const itemSkus = Platform.select({
  ios: {
    skus: [
      '10_mnth',
      '96_1year',

    ]
  },
  android: {
    skus: [
      '96_1year',
      '10_mnth',
    ]
  }
});

class SignUp extends React.PureComponent {

  purchaseUpdateSubscription = null
  purchaseErrorSubscription = null

  constructor(props) {
    super(props);
    this.state = {
      isClick: false,
      email: '',
      passWord: '',
      cnfrmPassword: '',
      planId: '',
      duration: '',
      Stripe_token: '',
      first_name: '',
      last_name: '',
      isSubscribe: false,
      subscribeIndex: 0,
      isPrivacy: false,
      count: 0,
      subscribeId: '',
      subPrice: '',
      promoRes: {},
      promoData: {},
      productDtls: [],
      productId: '',
      plan: [],
      id: '',
      duration: '',
      price: '',
      startDate: '',
      endDate: '',
      isLoading: false,
      date: '',
      subKeys: [],
      payPlans: [],
      iosPlan: []

    }
    //  setI18nConfig(); // set initial config
    //  this._fetchData();
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: responsiveHeight(3),
          width: "100%",
          // backgroundColor: "#000",  
        }}
      />
    );
  };


  // componentDidMount() {

  //   }

  ///// ****** In app Purchase ****** /////


  componentDidMount() {
    this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
      console.log('purchaseUpdatedListener', purchase);
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
          .then(async (deliveryResult) => {
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
      // alert(purchaseErrorListener.message)
    });

    console.log('itemskus', itemSkus);
    RNIap.initConnection();
    RNIap.getSubscriptions(itemSkus).then(purchase => {
      if (Platform.OS == 'ios') {
        this.payFuncIos(purchase);
      }
      else {
        this.payFunc(purchase);
      }
    }).catch((error) => {
      console.log(error.message);
    })

  }
  payFuncIos = (products) => {

    this.setState({ productDtls: products })
    console.warn(products);
  }

  payFunc = (products) => {

    var subsArray = [];
    var plans = [];
    for (let i = 0; i < products.length; i++) {

      var subJson = JSON.parse(products[i].originalJson);
      var productKey = subJson.productId;
      subsArray.push(productKey);
      plans.push(subJson);

    }
    this.setState({ productDtls: products, subKeys: subsArray, payPlans: plans });
    console.log(this.state.payPlans);
    //   this.requestSubscription(subsArray[0]);
  }

  requestSubscription = async (sku) => {
    //alert(sku);
    try {
      await RNIap.requestSubscription(sku);
      this.showAlert("Successfully connect to store");
      //console.warn('success');
      this.SignUpFree()
      // this.proceedToNextPage();
    } catch (err) {
      console.warn(err.code, err.message);
      // this.SignUpFree()
      // this.showAlert(JSON.stringify(err.message));
    }
    //this.proceedToNextPage();
  }

  payForSubs = () => {
    if (Platform.OS == 'android') {
      var subsArray = this.state.productDtls;
      if (!this.state.isSubscribe) {
        this.showAlert('Please Select a Subscription');
      }
      else {
        this.requestSubscription(subsArray[this.state.subscribeIndex].productId);
      }
    }
    else {
      var productArray = this.state.productDtls
      if (!this.state.isSubscribe) {
        this.showAlert('Please Select a Subscription');
      }
      else {
        this.requestSubscription(productArray[this.state.subscribeIndex].productId);
        //alert(productArray[this.state.radioActive].productId);
      }
    }

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

  ///// ****** In app Purchase ****** /////

  UNSAFE_componentWillMount() {
    Orientation.lockToPortrait()
    let { actions } = this.props;
    //alert(JSON.stringify(responseData));
    actions.getsubscriptionListingData('');
  }
  UNSAFE_componentWillReceiveProps() {
    let { signUpDetail, loading, message, result, subscriptionDetails, promoRes, promomessage, promoresult, subsmessage, subresult } = this.props;
    if (promoresult == true) {
      alert(promomessage)
      // this.setState({isSubscribe:false})
    }

  }

  checkPromoCodeDetails = (params) => {

    axios.post(Constant.BASEURL + Constant.CHECK_PROMOCODE, params, Utils.postHeader()).
      then((res) => {
        this.setState({ isLoading: false });
        let data = res.data;
        if (data) {
          console.log(JSON.stringify(data))
          if (data) {
            this.setState({ isModalVisible: false })
            if (data.result) {
              this.setState({ promoRes: data })
              this.setState({ promoData: data.data })
              // Alert.alert('Biawazo',data.message)



            }
            else {
              Alert.alert('Biawazo', data.message)
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
          for (let i = 0; i < arrMsg.length; i++) {
            if (i === 0) {
              msg = arrMsg[i]
            } else {
              msg = msg + "\n" + arrMsg[i]
            }

          }


          Alert.alert('Alert', msg, [{ text: 'OK' }], { cancelable: false });

        } catch (e) { }

      });
  }
  signUpDetails = (alt, result) => {
    if (result == true) {

      // this.props.navigation.navigate('Login')
    }
    else {
      if (alt.length > 0)
        alert(alt)
    }
  }
  subscriptionPlan = (ind, status, price, plan, duration, subId, subPrice, proId) => {
    (status == true) ? this.setState({ isSubscribe: false }) : this.setState({ isSubscribe: true })
    this.setState({ subscribeIndex: ind })
    this.setState({ productId: proId })
    this.state.subscribeIndex = ind
    this.state.price = price
    this.state.planId = plan
    this.state.duration = duration
    this.state.subscribeId = subId
    this.state.subPrice = subPrice
  }
  applyPromoCode = async (subId, amount) => {
    if (this.state.planId === '') {
      Alert.alert('Biawazo', 'Please choose a plan');
    }
    if (this.state.promocode === '') {
      Alert.alert('Biawazo', 'Please enter promocode');
    } else {
      //   const value = await AsyncStorage.getItem('userId')
      // if(value != null) {
      let param = { 'promocode': this.state.promocode, 'subscription_id': subId, 'pay_amount': amount, 'user_id': '' }
      this.checkPromoCodeDetails(param)
      // }
    }
  }
  pressForRegistrationIap = (msg, res) => {

    if (this.state.first_name === '') {
      Alert.alert('Biawazo', 'Please enter First Name');
    }
    else if (this.state.last_name === '') {
      Alert.alert('Biawazo', 'Please enter Last Name');
    }
    else if (this.state.email === '') {
      Alert.alert('Biawazo', 'Please enter Email');
    }
    else if (this.state.passWord === '') {
      Alert.alert('Biawazo', 'Please enter Password')
    }
    else if (this.state.cnfrmPassword === '') {
      Alert.alert('Biawazo', 'Please enter Confirm Password')
    }
    else if (this.state.cnfrmPassword !== this.state.passWord) {
      Alert.alert('Biawazo', 'Password & Confirm Password does not match')
    }
    else if (!this.state.isSubscribe) {
      Alert.alert('Biawazo', 'Please Choose Plan')
    }
    else if (!this.state.isPrivacy) {
      Alert.alert('Biawazo', 'Please check Privacy Policy')
    }

    else if (Emailvalidator.isEmailValid(this.state.email) == false) {
      alert('The email must be a valid email address.');

    }
    else {

      this.payForSubs()

    }
  }
  // pressForRegistration =(msg,res)=> {

  //   if (this.state.first_name === '') {
  //     Alert.alert('Biawazo','Please enter First Name');
  //   } 
  //   else if(this.state.last_name === ''){
  //     Alert.alert('Biawazo','Please enter Last Name');
  //   }
  //   else if(this.state.email===''){
  //     Alert.alert('Biawazo','Please enter Email');
  //   }
  //   else if(this.state.passWord===''){
  //     Alert.alert('Biawazo','Please enter Password') 
  //   }
  //   else if(this.state.cnfrmPassword===''){
  //     Alert.alert('Biawazo','Please enter Confirm Password') 
  //   }
  //   else if (this.state.cnfrmPassword !== this.state.passWord){
  //     Alert.alert('Biawazo','Password & Confirm Password does not match')
  //   }     
  //   else if (!this.state.planId){
  //     Alert.alert('Biawazo','Please Choose Plan')
  //   }    
  //   else if (!this.state.isPrivacy){
  //     Alert.alert('Biawazo','Please check Privacy Policy')
  //   }  

  //    else if (Emailvalidator.isEmailValid(this.state.email)==false) {
  //     alert('The email must be a valid email address.');

  //   } else {
  //     if (res.new_amount<1.00){
  //       this.setState({ isLoading: true });
  //     this.SignUpFree(res.new_amount)
  //     }else{
  //     this.props.navigation.navigate('AddSubscription',{'first_name':this.state.first_name,'last_name':this.state.last_name,'email':this.state.email,'price':(msg=='Promocode is valid')? res.new_amount:this.state.price,'planId':this.state.planId,'duration':this.state.duration,'password':this.state.passWord})
  //   }
  // }
  // } 
  SignUpFree = (price) => {

    let params = {
      'first_name': this.state.first_name,
      'last_name': this.state.last_name,
      'email': this.state.email,
      'password': this.state.passWord,
      'plan_id': this.state.planId,
      'duration': this.state.duration,
      'payment_amount': price,
      'stripe_token': ''
    };
    axios.post(Constant.BASEURL + Constant.SIGNUP_FREE, params, Utils.postHeader()).
      then((res) => {
        this.setState({ isLoading: false });
        let data = res.data;
        if (data) {
          console.log(JSON.stringify(data))
          if (data) {
            if (data.result) {
              alert(data.message)
              this.props.navigation.navigate('Login')
            }
            else {
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
          for (let i = 0; i < arrMsg.length; i++) {
            if (i === 0) {
              msg = arrMsg[i]
            } else {
              msg = msg + "\n" + arrMsg[i]
            }

          }


          Alert.alert('Alert', msg, [{ text: 'OK' }], { cancelable: false });

        } catch (e) { }

      });


  }
  isPrivacy = (status) => {
    (status) ? this.setState({ isPrivacy: false }) : this.setState({ isPrivacy: true })
  }
  handleOnPress = () => {
    alert('hello')
    // this.props.navigation.navigate('Login')
  }
  renderItem = (item, index) => {
    return (
      <View style={{ width: responsiveWidth(80), justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: responsiveWidth(5) }}>
        {(item) && <TouchableOpacity onPress={() => this.subscriptionPlan(index, this.state.isSubscribe, item.price, item.productId, (Platform.OS === 'ios') ? (index == 0) ? 30 : 365 : (index == 0) ? 365 : 30, item.subscription_id, item.price, item.productId)} style={{ flexDirection: 'row' }}><Image source={(this.state.isSubscribe && index == this.state.subscribeIndex) ? radioOnImage : radioOffImage} /><Text style={Styles.loginButtonText}>{(Platform.OS == 'ios') ? item.title + '  ' + item.localizedPrice : item.description + '  ' + item.localizedPrice}</Text></TouchableOpacity>}
        {/* <TouchableOpacity onPress={()=>this.setState({productId:item.productId})} style={{flexDirection:'row'}}><Image source={(this.state.isSubscribe && index==this.state.subscribeIndex)?radioOnImage:radioOffImage}/><Text style={Styles.loginButtonText}>{item.title} (${item.price})</Text></TouchableOpacity> */}

      </View>
    )
  }
  render() {
    let { signUpDetail, loading, message, result, subscriptionDetails, promoRes, promomessage, promoresult, subsmessage, subresult } = this.props;
    if (subscriptionDetails == null) {
      subscriptionDetails == []
    }
    return (
      <View style={GlobalStyle.container}>
        <View style={GlobalStyle.subContainer}>
          <ScrollView contentContainerStyle={{ width: responsiveWidth(100), height: responsiveHeight(120) }}  >
            <ImageBackground source={blueBackground} style={Styles.imageBackground} imageStyle={{ resizeMode: 'stretch' }}>

              {/* <Image source={LogoImage} style={Styles.Searchimage}></Image> */}
              <View style={Styles.purpleView}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginRight: responsiveWidth(85), width: responsiveWidth(5), marginLeft: responsiveWidth(10), padding: responsiveHeight(3) }}><Text></Text><Image source={backImage} style={Styles.Searchimage}></Image></TouchableOpacity>
                <Text style={{ fontFamily: 'LakkiReddy', fontSize: responsiveFontSize(5), color: color.white }}>Sign Up!</Text>
                <View style={Styles.textFieldView}>
                  <View style={[Styles.commontextFieldView, { width: responsiveWidth(40) }]}>
                    <TextInput placeholder={'First Name'} style={Styles.commonTextInput} placeholderTextColor={color.darkGray} returnKeyType={'next'} onChangeText={text => this.setState({ first_name: text })}></TextInput>
                  </View>
                  <View style={[Styles.commontextFieldView, { width: responsiveWidth(40) }]}>
                    <TextInput placeholder={'Last Name'} style={Styles.commonTextInput} placeholderTextColor={color.darkGray} onChangeText={text => this.setState({ last_name: text })}></TextInput>
                  </View>
                </View>
                <View style={[Styles.commontextFieldView, { marginTop: responsiveHeight(2) }]}>
                  <TextInput placeholder={'Email Address'} style={[Styles.commonTextInput, { width: responsiveWidth(75) }]} placeholderTextColor={color.darkGray} onChangeText={text => this.setState({ email: text })} keyboardType={'email-address'}></TextInput>
                </View>
                <View style={[Styles.textFieldView, { marginTop: responsiveHeight(2) }]}>
                  <View style={[Styles.commontextFieldView, { marginTop: responsiveHeight(2), width: responsiveWidth(40) }]}>
                    <TextInput placeholder={'Password'} style={Styles.commonTextInput} placeholderTextColor={color.darkGray} secureTextEntry={true} onChangeText={text => this.setState({ passWord: text })}></TextInput>
                  </View>
                  <View style={[Styles.commontextFieldView, { marginTop: responsiveHeight(2), width: responsiveWidth(40) }]}>
                    <TextInput placeholder={'Confirm Password'} style={Styles.commonTextInput} placeholderTextColor={color.darkGray} secureTextEntry={true} onChangeText={text => this.setState({ cnfrmPassword: text })}></TextInput>
                  </View>
                </View>
                <Text style={{ fontFamily: 'LakkiReddy', fontSize: responsiveFontSize(3), color: color.white, marginTop: responsiveHeight(3) }}>Choose Plan</Text>
                <FlatList style={{ marginTop: responsiveHeight(1) }} data={this.state.productDtls}
                  renderItem={renderItem}
                  ItemSeparatorComponent={this.renderSeparator}
                />

                {(this.state.promoRes.message == 'Promocode is valid') ? <Text style={Styles.loginButtonText}>Net Payable Amount:${this.state.promoData.new_amount}</Text> : null}
                <TouchableOpacity onPress={() => this.isPrivacy(this.state.isPrivacy)} style={{ flexDirection: 'row', marginLeft: responsiveWidth(8), marginRight: responsiveWidth(5), marginTop: responsiveHeight(5) }}><Image source={(this.state.isPrivacy) ? radioOnImage : radioOffImage} /><Text style={Styles.loginButtonText}>By signing on, you agree to adhere to our privacy policy.Scroll to the bottom of the page to view our policy on use of our learning content</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.pressForRegistrationIap()} style={[GlobalStyle.commonButton, { marginTop: responsiveHeight(2) }]}><Text style={Styles.loginButtonText}>Register</Text></TouchableOpacity>

              </View>
            </ImageBackground>
            {/* <View style={[GlobalStyle.bottomTextView]}>   
               
        </View>  */}
          </ScrollView>
        </View>



      </View>

    );
  }
}
const mapStateToProps = state => ({


  signUpDetail: state.signupReducerConfig.signUpDetails,
  loading: state.signupReducerConfig.loading,
  message: state.signupReducerConfig.message,
  result: state.signupReducerConfig.result,
  subscriptionDetails: state.signupReducerConfig.subscriptionDetails,
  promoRes: state.signupReducerConfig.promoRes,
  promomessage: state.signupReducerConfig.promomessage,
  promoresult: state.signupReducerConfig.promoresult,
  subresult: state.signupReducerConfig.subresult,
  subsmessage: state.signupReducerConfig.subsmessage,



});

const ActionCreators = Object.assign(
  {},
  signupActions,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight, useResponsiveFontSize } from 'react-native-responsive-dimensions';
import Spinner from 'react-native-loading-spinner-overlay';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import { thisTypeAnnotation } from '@babel/types';
import { ScrollView } from 'react-native-gesture-handler';
import * as signupActions from './../../redux/actions/signupActions'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation';
import axios from 'axios';
import Utils from '../../Utils/utils';
import Constant from './../../redux/constants';
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
import * as RNIap from 'react-native-iap';
const backgroundIg = require('../../../assets/home-bg.png');
const backIg = require('../../../assets/btn-back.png');
const headerImage = require('../../../assets/top-bar.png');
const selectTickImage = require('../../../assets/select-tick.png');
const expertImage = require('../../../assets/block-expert.png');
const weeklyImage = require('../../../assets/weekly-block.png');
const monthlyImage = require('../../../assets/monthly-block.png');
const yearlyImage = require('../../../assets/yearly-block.png');

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

 class Subscription extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isSubscribe:true,
       category:'monthly',
       promocode:'',
       count:'',
       productDtls:[],
     }
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
      // alert(purchaseErrorListener.message)
    });
  
    console.log('itemskus',itemSkus);
    RNIap.initConnection();
    RNIap.getSubscriptions(itemSkus).then(purchase => {
      if(Platform.OS == 'ios')
        {
            this.payFuncIos(purchase);
        }
        else
        {
          this.payFunc(purchase);
        }
       }).catch((error) => {
        console.log(error.message);
       })
    //async componentDidMount() {
    
    

    // RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }
  payFuncIos = (products) =>{
    
    this.setState({productDtls:products})
    console.warn(products);
  }
    
    payFunc = (products) =>{
  
      var subsArray = [];
      var plans = [];
      for(let i=0;i<products.length;i++)
      {
        
        var subJson = JSON.parse(products[i].originalJson);
        var productKey = subJson.productId;
        subsArray.push(productKey);
        plans.push(subJson);
        
      }
      this.setState({productDtls:products,subKeys:subsArray,payPlans:plans});
      console.log('price',this.state.productDtls);
      
   //   this.requestSubscription(subsArray[0]);
    }
  
    requestSubscription = async (sku) => {
     //alert(sku);
      try {
        await RNIap.requestSubscription(sku.productId);
        this.showAlert("Successfully connect to store");
        //console.warn('success');
        this.subscriptionFree(sku.price,sku.productId,(Platform.OS==='ios')?(index==0)?30:365:(index==0)?365:30)
        // this.proceedToNextPage();
      } catch (err) {
        console.warn(err.code, err.message);
        // this.SignUpFree()
        // this.showAlert(JSON.stringify(err.message));
      }
      //this.proceedToNextPage();
    }
  
    payForSubs = () =>{
      if(Platform.OS == 'android')
      {
        var subsArray = this.state.productDtls;
        if(!this.state.isSubscribe)
        {
          this.showAlert('Please Select a Subscription');
        }
        else{
          this.requestSubscription(subsArray[this.state.subscribeIndex].productId);
        }
      }
      else
      {
        var productArray=this.state.productDtls
        if(!this.state.isSubscribe)
        {
          this.showAlert('Please Select a Subscription');
        }
        else{
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
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
  this.clickOnSubscription(true,'monthly')
  
    let {actions} = this.props;
    //alert(JSON.stringify(responseData));
    actions.getsubscriptionListingData('');
 
}
UNSAFE_componentWillReceiveProps(){
 
  
  let {signUpDetail,loading,message,result,subscriptionDetails,promoRes,promomessage,promoresult,subsmessage,subresult} = this.props;
  console.log(signUpDetail,loading,message,result,subscriptionDetails,promoRes,promomessage,promoresult,subsmessage,subresult)
  if(promoresult==true){
    alert(promomessage)
    // this.setState({isSubscribe:false})
  
   this.setState({isSubscribe:false})
 }
}
applyPromoCode= async(subId,amount,index)=>{
  if (this.state.promocode === '') {
    alert('Please enter promocode');
  } else{
    const value = await AsyncStorage.getItem('userId')
  if(value !== null) {
    let param={'promocode':this.state.promocode,'subscription_id':subId,'pay_amount':amount,'user_id':value}
    let {actions} = this.props;
    //alert(JSON.stringify(responseData));
    actions.checkPromoCodeDetails(param);
    this.state.count=index
  }
  }
}
buySubscription=  (amount,planId,dur,msg,res)=>{
  if (res.new_amount<1.00){
   
this.subscriptionFree(amount,planId,dur,msg,res)
  }
  else{
  this.props.navigation.navigate('AddSubscription',{'price':(msg=='Promocode is valid')?res.new_amount:amount,'planId':planId,'duration':dur,'type':'subscription'})
  }
}
subscriptionFree =async(amount,planId,dur) =>{
    
   
  const value = await AsyncStorage.getItem('userId')
if(value !== null) {
let userId=value
let params = {        
  'user_id': value, 
  'plan_id': planId,
  'duration':dur,
  'payment_amount':amount,
  'stripe_token':''
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
clickOnSubscription=(status,cat)=>{
  
  if (status==true && cat == this.state.category){
  this.setState({isSubscribe:false})
  }
  else{
  this.setState({isSubscribe:true})
  }
  this.setState({category:cat})
}
navigateFromSideMenu=(page)=>{
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate(page)
}
  //Design
  render() {
    let {signUpDetail,loading,message,result,subscriptionDetails,promoRes,promomessage,promoresult,subsmessage,subresult} = this.props;
    if (subscriptionDetails==null){
      subscriptionDetails==[]
    }
    // if(promomessage=='Promocode is invalid'){
    //   alert('Promocode is invalid')
    // }
    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
        {loading && <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }   
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginLeft:responsiveWidth(4)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(2.6),marginRight:responsiveWidth(32),color:color.white,fontFamily:'LakkiReddy'}}>Subscription</Text></ImageBackground>          
        </View>
      {/* <ScrollView contentContainerStyle={{width:responsiveWidth(100),justifyContent:'flex-start',alignItems:'center',marginBottom:responsiveHeight(5)}}> */}
        <View style={Styles.purpleView}>

        <FlatList style={{marginTop:responsiveHeight(2),height:responsiveHeight(80)}}  data={this.state.productDtls} 
                    renderItem={({item,index}) => 
                    <View style={{alignItems:'center',backgroundColor:color.white,borderWidth:1,borderColor:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow,width:responsiveWidth(80),borderRadius:40,marginTop:responsiveHeight(3)}}>
                    
                    <TouchableOpacity onPress={()=>this.clickOnSubscription(this.state.isSubscribe,'weekly')}>
        <View style={{flexDirection:'row',width:responsiveWidth(38),justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(1),marginLeft:responsiveWidth(20)}}><Text style={[Styles.homeText,{color:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow}]}>{item.subscription_type}</Text></View>
                    <Text style={[Styles.subscriptionTextView,{width:responsiveWidth(70),textAlign:'center',fontSize:responsiveFontSize(3),fontFamily:'LakkiReddy', color:color.black}]}>{(Platform.OS==='ios')?item.title:item.description}</Text>
                    <View style={{justifyContent:'center',alignItems:'flex-start',marginTop:responsiveHeight(2)}}>
                    <Text style={[Styles.subscriptionTextView,{textAlign:'center',marginLeft:responsiveWidth(2),color:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow,fontSize:responsiveFontSize(4),fontWeight:'bold'}]}>{item.localizedPrice}</Text>
                    <Text style={[Styles.subscriptionTextView,{textAlign:'center',marginLeft:responsiveWidth(2),color:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow}]}>{(Platform.OS==='ios')?(index==0)&&'per month' ||(index==1)&&'per year':(index==0)&&'per year' ||(index==1)&&'per month'}  </Text>
                   </View>
                    <View style={{flexDirection:'row',width:responsiveWidth(75),marginTop:responsiveHeight(2),justifyContent:'space-between'}}>
                    <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                    {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     {(item.description1=='')?null: <View style={{width:5,height:5,borderRadius:2.5,backgroundColor:color.lightgray}}></View>}
                      <Text style={[Styles.subscriptionTextView,{textAlign:'center',marginLeft:responsiveWidth(2)}]}>{item.description1}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                      {(item.description2=='')?null:<View style={{width:5,height:5,borderRadius:2.5,backgroundColor:color.lightgray}}></View>}
                      <Text style={[Styles.subscriptionTextView,{textAlign:'center',marginLeft:responsiveWidth(2)}]}>{item.description2}</Text>
                    </View> */}
                    {/* <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                      {(item.description3=='')?null:<View style={{width:5,height:5,borderRadius:2.5,backgroundColor:color.lightgray}}></View>}
                      <Text style={[Styles.subscriptionTextView,{textAlign:'center',marginLeft:responsiveWidth(2)}]}>{item.description3}</Text>
                    </View> */}
                    {/* <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                      {(item.description4=='')?null:<View style={{width:5,height:5,borderRadius:2.5,backgroundColor:color.lightgray}}></View>}
        <Text style={[Styles.subscriptionTextView,{textAlign:'center',marginLeft:responsiveWidth(2)}]}>{item.description4}</Text>
                    </View> */}
                    </View>
                    
                    </View>
                    </TouchableOpacity>
                    {/* <View style={[Styles.textFldView,{marginTop:responsiveHeight(2)}]}>
                   <View style={[Styles.commontextFieldView,{width:responsiveWidth(40),borderWidth:1,borderColor:color.lightgray}]}>
                   <TextInput placeholder={'Enter Promo Code'} style={[Styles.commonTextInput,{paddingLeft:responsiveWidth(2)}]} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({promocode:text})}></TextInput>
                   </View>
                   <TouchableOpacity onPress={()=>{this.applyPromoCode(item.subscription_id,item.price,index)}} style={[Styles.commonButton,{marginLeft:responsiveWidth(5),backgroundColor:color.blue,width:responsiveWidth(30)}]}><Text style={Styles.loginButtonText}>Apply Code</Text></TouchableOpacity>
                   </View> */}
                   {(promomessage=='Promocode is valid' && this.state.count==index)? <Text style={[Styles.loginButtonText,{marginTop:responsiveHeight(2),color:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow}]}>Net Payable Amount:${promoRes.new_amount}</Text>:null}
                   {/* <TouchableOpacity onPress={()=>{this.buySubscription(item.price,item.subscription_id,(Platform.OS==='ios')?(index==0)?30:365:(index==0)?365:30 ,promomessage,promoRes)}} style={[Styles.commonButton,{marginTop:responsiveHeight(5),marginBottom:responsiveHeight(2),borderRadius:responsiveWidth(6),backgroundColor:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow,width:responsiveWidth(50)}]}><Text style={[Styles.loginButtonText,{fontSize:responsiveFontSize(3)}]}>Enroll Now</Text></TouchableOpacity> */}
                   {/* <TouchableOpacity onPress={()=>{this.subscriptionFree(item.price,item.productId,(Platform.OS==='ios')?(index==0)?30:365:(index==0)?365:30 ,promomessage,promoRes)}} style={[Styles.commonButton,{marginTop:responsiveHeight(5),marginBottom:responsiveHeight(2),borderRadius:responsiveWidth(6),backgroundColor:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow,width:responsiveWidth(50)}]}><Text style={[Styles.loginButtonText,{fontSize:responsiveFontSize(3)}]}>Enroll Now</Text></TouchableOpacity> */}
                   <TouchableOpacity onPress={()=>{this.requestSubscription(item)}} style={[Styles.commonButton,{marginTop:responsiveHeight(5),marginBottom:responsiveHeight(2),borderRadius:responsiveWidth(6),backgroundColor:(index==0)&&color.green || (index==1)&&color.orange || (index==2)&&color.yellow,width:responsiveWidth(50)}]}><Text style={[Styles.loginButtonText,{fontSize:responsiveFontSize(3)}]}>Enroll Now</Text></TouchableOpacity>

                   
                    </View>   
                      
                            
                          }  
                    ItemSeparatorComponent={this.renderSeparator}  
                /> 


        </View>
        
       
        </ImageBackground>
       
        
        </View>
        
      </View>
    );
  }
}
const mapStateToProps = state => ({


  signUpDetail : state.signupReducerConfig.signUpDetails,
  loading : state.signupReducerConfig.loading,
  message : state.signupReducerConfig.message,
  result : state.signupReducerConfig.result,
  subscriptionDetails:state.signupReducerConfig.subscriptionDetails,
  promoRes:state.signupReducerConfig.promoRes,
  promomessage:state.signupReducerConfig.promomessage,
  promoresult:state.signupReducerConfig.promoresult,
  subresult:state.signupReducerConfig.subresult,
  subsmessage:state.signupReducerConfig.subsmessage,
  //  todo:signUpDetails(state.signupReducerConfig.message,state.signupReducerConfig.result),
 


});

const ActionCreators = Object.assign(
  {}, 
  signupActions,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(Subscription)
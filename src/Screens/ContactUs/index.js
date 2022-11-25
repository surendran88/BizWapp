import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform,Alert,KeyboardAvoidingView,Linking,ScrollView} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';

import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import { thisTypeAnnotation } from '@babel/types';
import * as messageAction from './../../redux/actions/messageAction'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Utils from '../../Utils/utils';
import Constant from './../../redux/constants';
import Emailvalidator from '../Login/Emailvalidator';
import Orientation from 'react-native-orientation';
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
const backgroundIg = require('../../../assets/home-bg.png');
const backIg = require('../../../assets/btn-back.png');
const headerImage = require('../../../assets/top-bar.png');
const AddressImage = require('../../../assets/icon-address.png');
const phoneImage = require('../../../assets/phone-call.png');
const mailImage = require('../../../assets/mail.png');
const timeImage = require('../../../assets/time.png');
const shareImage = require('../../../assets/share-2.png');
const facebookImage = require('../../../assets/facebook-logo.png');
const twitterImage = require('../../../assets/twitter-logo.png');
const instagramImage = require('../../../assets/instagram-logo.png');
const googlePlusImage = require('../../../assets/youtube.png');


class ContactUs extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isSubscribe:true,
       category:'contact',
       isContact:true,
       name:'',
       email:'',
       subject:'',
       message:'',
       alertMessage:'',
       isloading:false
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
  UNSAFE_componentWillReceiveProps(){
    let {messageData,loading,message,result}=this.props
    console.log(messageData,loading,message,result)
 
    
      if (message){
        this.setState({alertMessage:message})
        }
   
  }
  // sendMessage=()=>{
   
  //   let {actions} = this.props;
   
  //   actions.messageUs(params);
  // }
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
  this.clickOnSubscription(true,'monthly')
  this.setState({category:'contact'})
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
tabstatus=(status,cat)=>{
(status==true)?this.setState({isContact:false}):this.setState({isContact:true})
this.setState({category:cat})
}
navigateFromSideMenu=(page)=>{
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate(page)
}
sendMessage=()=> {
 
  if (this.state.name === '') {
    Alert.alert('Biawazo','Please enter Name');
  } 
  else if(this.state.email === ''){
    Alert.alert('Biawazo','Please enter Email');
  } 
  else if(this.state.subject === ''){
    Alert.alert('Biawazo','Please enter Subject');
  } 
  else if(this.state.message === ''){
    Alert.alert('Biawazo','Please enter Message');
  } 
  else if (Emailvalidator.isEmailValid(this.state.email)==false) {
    Alert.alert('Biawazo','Please enter valid email address');
  }
  else{
 
    // this.setState({isloading:true})
   
   this.Message()
  }
  
} 
Message = () =>{
    
   
  let params = {'name':this.state.name,'email':this.state.email,'subject':this.state.subject,'message':this.state.message};
  axios.post(Constant.BASEURL + Constant.MESSAGE_US, params,Utils.postHeader()).
      then((res) => {
          this.setState({ isLoading: false });
          let data = res.data;
          if (data) {
            console.log(JSON.stringify(data))                                    
              if (data){
             if(data.result){
              Alert.alert('Biawazo',data.message)
               
                 this.setState({isloading:false})
               
               this.setState({name:'',email:'',subject:'',message:''})
             }
             else{
              Alert.alert('Biawazo',data.message)
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
  //Design
  render() {
    let {messageData,loading,message,result}=this.props
    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
        {(this.state.isloading) && <Spinner
          visible={this.state.isloading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   } 
        <ScrollView contentContainerStyle={{width:responsiveWidth(100)}} keyboardShouldPersistTaps={'handled'}>     
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginLeft:responsiveWidth(4)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),marginRight:responsiveWidth(36),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1)}}>Contact Us</Text></ImageBackground>          
        </View>
      
        <View style={Styles.headerView}>
         <View style={{width:responsiveWidth(50),height:responsiveHeight(5),justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity onPress={()=>this.tabstatus(this.state.isContact,'contact')} style={(this.state.isContact)?{borderBottomWidth:responsiveWidth(1),borderBottomColor:color.purple}:null}><Text style={{fontSize:responsiveFontSize(3),color:(this.state.isContact)?color.purple:color.lightgray,fontFamily:'LakkiReddy'}}>Contact Us</Text></TouchableOpacity>
         </View>
         <View style={{width:responsiveWidth(50),height:responsiveHeight(5),justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity onPress={()=>this.tabstatus(this.state.isContact,'message')} style={(this.state.isContact)? null: {borderBottomWidth:responsiveWidth(1),borderBottomColor:color.purple}}><Text style={{fontSize:responsiveFontSize(3),color:(this.state.isContact)?color.lightgray:color.purple,fontFamily:'LakkiReddy'}}>Message Us</Text></TouchableOpacity>
         </View>
        </View>
        {(this.state.category=='contact')?<View style={{justifyContent:'flex-start',alignItems:'flex-start',width:responsiveWidth(90),height:responsiveHeight(70)}}><View style={{flexDirection:'row',width:responsiveWidth(95),marginTop:responsiveHeight(5.4),justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Image source={AddressImage} style={{marginLeft:responsiveWidth(10)}}/>
                <View style={{marginLeft:responsiveWidth(5)}}>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.lightgray}]}>Address</Text>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.deepGray}]}>Houston TX 77095</Text>
                  </View>           
               </View>
               <View style={{flexDirection:'row',width:responsiveWidth(95),marginTop:responsiveHeight(2.5),justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Image source={phoneImage} style={{marginLeft:responsiveWidth(10)}}/>
                <View style={{marginLeft:responsiveWidth(5)}}>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.lightgray}]}>Phone</Text>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.deepGray}]}>(281) 785-4404</Text>
                  </View>           
               </View>
               <View style={{flexDirection:'row',width:responsiveWidth(95),marginTop:responsiveHeight(2.5),justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Image source={mailImage} style={{marginLeft:responsiveWidth(10)}}/>
                <View style={{marginLeft:responsiveWidth(5)}}>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.lightgray}]}>Email</Text>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.deepGray}]}>contact@biawazo.com</Text>
                  </View>           
               </View>
               <View style={{flexDirection:'row',width:responsiveWidth(95),marginTop:responsiveHeight(2.5),justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Image source={timeImage} style={{marginLeft:responsiveWidth(10)}}/>
                <View style={{marginLeft:responsiveWidth(5)}}>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.lightgray}]}>Opening Hours</Text>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.deepGray}]}>Always Open</Text>
                  </View>           
               </View>
               <View style={{flexDirection:'row',width:responsiveWidth(95),marginTop:responsiveHeight(2.5),justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Image source={shareImage} style={{marginLeft:responsiveWidth(10)}}/>
                <View style={{marginLeft:responsiveWidth(5)}}>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2),color:color.lightgray}]}>Stay Connected</Text>
                <View style={{flexDirection:'row',width:responsiveWidth(35),justifyContent:'space-between',alignItems:'flex-start'}}>
                <TouchableOpacity onPress={()=>Linking.openURL('https://www.facebook.com/akwukwo/')}><Image source={facebookImage}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>Linking.openURL('https://twitter.com/akwukwollc/')}><Image source={twitterImage}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>Linking.openURL('https://www.instagram.com/biawazo/')}><Image source={instagramImage}/></TouchableOpacity>
                <TouchableOpacity onPress={()=>Linking.openURL('https://www.youtube.com/channel/UCaxnP38lionMGpvZh1qKqWA')}><Image source={googlePlusImage}/></TouchableOpacity>
                  </View>
                  </View>           
               </View></View>:
               <View style={{justifyContent:'flex-start',alignItems:'center',width:responsiveWidth(85),height:responsiveHeight(70)}}>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(3),marginTop:responsiveHeight(2),height:responsiveHeight(5),color:color.deepGray,textAlign:'left'}]}>We would Love To Hear From You!</Text>
                <Text style={[{fontSize:responsiveFontSize(1.5),color:color.lightgray,textAlign:'left'}]}>If you have any questions, please call us or fill in the form below and we will get back to you very soon.</Text>
                <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(80)}]}>
        {/* <Image source={lockImage} style={Styles.lockimage}></Image> */}
        <TextInput placeholder={'Name'} style={[GlobalStyle.commonTextInput]} placeholderTextColor={color.darkGray} onChangeText={text=>this.setState({name:text})} value={this.state.name}></TextInput>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(80)}]}>
        {/* <Image source={lockImage} style={Styles.lockimage}></Image> */}
        <TextInput placeholder={'Email'} style={[GlobalStyle.commonTextInput]} placeholderTextColor={color.darkGray} onChangeText={text=>this.setState({email:text})} keyboardType={'email-address'} value={this.state.email}></TextInput>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(80)}]}>
        {/* <Image source={lockImage} style={Styles.lockimage}></Image> */}
        <TextInput placeholder={'Subject'} style={[GlobalStyle.commonTextInput]} placeholderTextColor={color.darkGray} onChangeText={text=>this.setState({subject:text})} value={this.state.subject}></TextInput>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(80),height:responsiveHeight(20),alignItems:'flex-start'}]}>
        {/* <Image source={lockImage} style={Styles.lockimage}></Image> */}
        <TextInput placeholder={'Message'} style={[GlobalStyle.commonTextInput,{height:responsiveHeight(15),textAlignVertical:'top',marginTop:responsiveHeight(1.5)}]} multiline={true} numberOfLines={10} placeholderTextColor={color.darkGray} onChangeText={text=>this.setState({message:text})} value={this.state.message}></TextInput>
        </View>
        <TouchableOpacity onPress={()=>{this.sendMessage()}} style={[GlobalStyle.commonButton,{marginTop:responsiveHeight(2),width:responsiveWidth(80)}]}><Text style={Styles.loginButtonText}>Submit</Text></TouchableOpacity>
         {/* <Text style={{fontSize:responsiveFontSize(2),color:'red',marginTop:responsiveHeight(1)}}>{(message) && message}</Text> */}
               </View>
              }
        </ImageBackground>
       
        </ScrollView>
        </View>
        {/* <View style={GlobalStyle.bottomTextView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUp')}}><Text style={[Styles.signUpButtonText,{color:color.darkGray,}]}>Don't have an Account? <Text style={[Styles.signUpButtonText,{fontWeight:'bold',color:color.purple}]}>SIGN UP</Text></Text></TouchableOpacity>
        </View> */}
      </View>
    );
  }
}
const mapStateToProps = state => ({


  messageData : state.messageApiResponseDataConfig.messageData,
  loading : state.messageApiResponseDataConfig.loading,
  message : state.messageApiResponseDataConfig.message,
  result : state.messageApiResponseDataConfig.result,
  
 


});

const ActionCreators = Object.assign(
  {}, 
  messageAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(ContactUs)
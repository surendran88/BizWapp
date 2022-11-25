import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,Alert,Linking} from 'react-native';
import {StackNavigator,withNavigation} from 'react-navigation';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import Constant from './../../redux/constants';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import Emailvalidator from '../Login/Emailvalidator';
import * as apiActions from '../../redux/actions/loginApiActions'; 
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Utils from '../../Utils/utils';
import Orientation from 'react-native-orientation';
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
const backgroundIg = require('../../../assets/login-bg.png');
const LogoImage = require('../../../assets/logo.png');
const lockImage = require('../../../assets/icon-pass.png');
const emailImage = require('../../../assets/icon-email.png');
const rememberToggledOnImage = require('../../../assets/toggle-on.png');
const rememberToggledOffImage = require('../../../assets/toggle-off.png');
const modalCloseImage = require('../../../assets/close-pop.png');
const edit = require('../../../assets/edit.png');
 class LoginIndex extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       rememberMe:false,
       isModalVisible:false,
      //  email:'bzlive.user1@yopmail.com',
      //  passWord:'Test12@',
       email:'',
       passWord:'',
       forgotemail:'',
       isloading:false,
     }
    }
   goToHome=()=>{
    
   }
   
   saveUserData = async (userId) => {
    try {
      await AsyncStorage.setItem('email',JSON.stringify(this.state.email) )
      await AsyncStorage.setItem('password',JSON.stringify(this.state.passWord) )
    } catch (e) {
      console.log(e)
      // saving error
    }
  }
   storeData = async (userId) => {
    try {
      await AsyncStorage.setItem('userId',JSON.stringify(userId) )
      this.props.navigation.navigate('Home')
    } catch (e) {
      console.log(e)
      
      // saving error
    }
  }
  UNSAFE_componentWillMount(){
   // this.goToNavigate()
    this.fetchUserData()
    Orientation.lockToPortrait();
  }
  goToNavigate = async() =>{
    
    //this.setState({isLoading:true})
    const value = await AsyncStorage.getItem('userId')
    
    if (value==''){

    }
    else{
      this.props.navigation.navigate('Home')
    }
  }
  fetchUserData=async()=>{
    const mail = await AsyncStorage.getItem('email')
    const pass = await AsyncStorage.getItem('password')
    if(mail !== null && pass !== null)  {
      this.setState({rememberMe:true})
      this.setState({email:JSON.parse(mail)})
      this.setState({passWord:JSON.parse(pass)})
    }
  }
rememberMe=(click)=>{
 if (click==true){
   this.setState({rememberMe:false})
   AsyncStorage.removeItem('email');
   AsyncStorage.removeItem('password');
 }
 else{
   this.setState({rememberMe:true})
   this.saveUserData()
 }
}
forgotPassword =(mail)=> {
  let params = {
    'email':mail,
    
  };
  axios.post(Constant.BASEURL + Constant.FORGOT_PASSWORD, params,Utils.postHeader()).
      then((res) => {
          this.setState({ isLoading: false });
          let data = res.data;
          if (data) {
            console.log(JSON.stringify(data))                                    
              if (data){
                this.setState({isModalVisible:false})
             if(data.result){
              Alert.alert('Biawazo',data.message)
               
                
               
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
callForgotPASSWORD=(mail)=>{
  if (this.state.forgotemail === '') {
    Alert.alert('Biawazo','Please enter email');
  } 
  else if (Emailvalidator.isEmailValid(this.state.forgotemail)) {
  let params={'email':mail}
   
    this.forgotPassword(mail)
  }
  else{
    Alert.alert('Biawazo','The email must be a valid email address.');
  }
}
loginPress =()=> {
 
  if (this.state.email === '') {
    Alert.alert('Biawazo','Please enter Email');
  } 
  else if(this.state.passWord === ''){
    Alert.alert('Biawazo','Please enter Password');
  } else if (Emailvalidator.isEmailValid(this.state.email)==false) {
    Alert.alert('Biawazo','The email must be a valid email address.');
   
    
  } else {
    this.setState({isloading:true})
  
   this.login()
  }
} 

UNSAFE_componentWillReceiveProps(){
  let {responseData,loading,message,result} = this.props;
  console.log(result,responseData,loading,message)
  if(message=='Logged in successfully')
  {
    this.setState({isloading:false})
    this.props.navigation.navigate('Home') 
    console.log('navigate')
    this.storeData(responseData.data.user_id)
  }
  else{
    console.log(result)
    if (result==false){
      this.setState({isloading:false})
    // Alert.alert('Biawazo',message)
    }
  
   
  }
}
login = () =>{
    
   
  let params = {
    'email':this.state.email,
    'password':this.state.passWord,
    'device_type':'1',
    'device_unique_code':'abcd123458'
  };
  axios.post(Constant.BASEURL + Constant.SIGNIN, params,Utils.postHeader()).
      then((res) => {
          this.setState({ isLoading: false });
          let data = res.data;
          if (data) {
            console.log(JSON.stringify(data))                                    
              if (data){
                
             if(data.result){
              Alert.alert('Biawazo', data.message)
               
                 this.setState({isloading:false})
                
                 console.log('navigate')
                 this.storeData(data.data.user_id)
               
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
    let {responseData,loading,message,result} = this.props;
  

    return (
     
      <View style={[GlobalStyle.container]}>        
        <View style={[GlobalStyle.subContainer]}>
                
        <Modal isVisible={this.state.isModalVisible} animationIn='zoomIn' animationOut='zoomOut'>
                      <View style={Styles.modalContainer}>
                        <View style={Styles.modalHead}>
                          <Text style={Styles.modalHeading}>Forgot Password ?</Text>
                          <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})} style={Styles.modalCross} >
                            <Image source={modalCloseImage}/>
                          </TouchableOpacity>
                        </View>

                        <TextInput style={Styles.modalInput} placeholder='Email' selectionColor={color.green} placeholderTextColor={color.white} onChangeText={(text)=>this.setState({forgotemail:text})} autoCapitalize={'none'} keyboardType={'email-address'}/>
                        <View ></View>

                        <TouchableOpacity onPress={()=>this.callForgotPASSWORD(this.state.forgotemail)} style={Styles.modalButton}>
                          {/* <Image source={require('../../assets/icon-send.png')} /> */}
                          <Text style={Styles.modalSendText}>SEND</Text>
                        </TouchableOpacity>
                      </View>
                    </Modal> 
                    {(this.state.loading) && <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }              
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>
        <Image source={LogoImage} style={Styles.Searchimage}></Image>
        <View style={Styles.purpleView}>
          <Text style={{fontFamily:'LakkiReddy',fontSize:responsiveFontSize(4.7),color:color.white,marginTop:responsiveHeight(1.9)}}>Login</Text>
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(4)}]}>
        <Image source={emailImage} style={Styles.emailimage}></Image>
        <TextInput placeholder={'Email'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.darkGray} keyboardType={'email-address'} autoCapitalize={'none'} onChangeText={text=>this.setState({email:text})} value={this.state.email}></TextInput>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(2)}]}>
        <Image source={lockImage} style={Styles.lockimage}></Image>
        <TextInput placeholder={'Password'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.darkGray} secureTextEntry={true} onChangeText={text=>this.setState({passWord:text})} value={this.state.passWord}></TextInput>
        </View>
        <View style={[Styles.RememberView,{marginTop:responsiveHeight(2)}]}>
        <TouchableOpacity onPress={()=>this.rememberMe(this.state.rememberMe)}>{(this.state.rememberMe)?<Image source={rememberToggledOnImage} style={Styles.lockimage}></Image>:<Image source={rememberToggledOffImage} style={Styles.lockimage}></Image>}</TouchableOpacity>
        <Text style={Styles.RememberMeTextView}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={()=>{this.loginPress()}} style={[GlobalStyle.commonButton,{marginTop:responsiveHeight(1)}]}><Text style={Styles.loginButtonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.setState({isModalVisible:true})}}><Text style={Styles.forgotButtonText}>FORGOT PASSWORD?</Text></TouchableOpacity>
        
        </View>
        </ImageBackground>
        <View style={[GlobalStyle.bottomTextView,{height:responsiveHeight(20)}]}>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginBottom:responsiveHeight(2)}} onPress={()=>{this.props.navigation.navigate('SignUp')}}><Text style={[Styles.signUpButtonText,{color:color.lightgray,}]}>Don't have an Account? <Text style={[Styles.signUpButtonText,{fontWeight:'bold',color:color.purple}]}>Sign Up!</Text></Text></TouchableOpacity>
        <TouchableOpacity style={{justifyContent:'center',flexDirection:'row',alignItems:'center',marginBottom:responsiveHeight(7)}} onPress={()=>Linking.openURL('https://www.youtube.com/playlist?list=PLVZClbqbigyiSLZigjnm8dXsG56Ves2P4')}><Text style={[Styles.signUpButtonText,{color:color.lightgray,}]}>Click HERE for a </Text><Text style={[Styles.signUpButtonText,{color:color.black,fontWeight:'bold',fontSize:responsiveFontSize(2.5)}]}>sneak peek</Text><Text style={[Styles.signUpButtonText,{color:color.lightgray}]}> of 1000+ content</Text></TouchableOpacity>

        </View>  
        </View>       
      </View>
    );
  }
}
const mapStateToProps = state => ({
 

  responseData : state.loginApiResponseDataConfig.responseData,
  loading : state.loginApiResponseDataConfig.loading,
  message : state.loginApiResponseDataConfig.message,
  result : state.loginApiResponseDataConfig.result,
  //  todo:getresponse(state.loginApiResponseDataConfig.message,state.loginApiResponseDataConfig.result,this.props),
 


});

const ActionCreators = Object.assign(
  {},
 
  apiActions
  

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default  connect(mapStateToProps,mapDispatchToProps)(LoginIndex)
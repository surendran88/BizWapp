import React, {Component} from 'react';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,KeyboardAvoidingView,FlatList,ScrollView,Alert,Platform} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';

import Styles from './style';
import GlobalStyle from '../../GlobalStyle';
import color from '../../components/Colors';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Utils from '../../Utils/utils';
import Constant from './../../redux/constants';
import ImagePicker from 'react-native-image-picker';
import Orientation from 'react-native-orientation';
// import console = require('console');
const backgroundIg = require('../../../assets/login-bg.png');
const LogoImage = require('../../../assets/logo.png');
const backImage = require('../../../assets/btn-back.png');
const selectTickImage = require('../../../assets/select-tick.png');
const radioOffImage = require('../../../assets/radio-off.png');
const radioOnImage = require('../../../assets/radio-on.png');
const rememberToggledOffImage = require('../../../assets/toggle-off.png');
const blueBackground = require('../../../assets/Asset.png');
const profileImage = require('../../../assets/profile.png');
const editImage = require('../../../assets/edit.png');
const modalCloseImage = require('../../../assets/close-pop.png');

export default class Profile extends Component{  
    constructor(props) {
      super(props);
     this.state={
       isClick:false,
       age:'',
       Country:'',
       mail:'',
       gender:'',
       grade:'',
       location:'',
       education:'',
       first_name:'',
       last_name:'',
       isSubscribe:false,
       subscribeIndex:'',
       image:'',
       ImageSource:'',
       loading:false,
       isModalVisible:false,
       oldPass:'',
       newPass:'',
       cnfrmPass:'',
       imageData:'',
       course:[],

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
       //Set Image Size and image picker
       chooseFile = () => {
        var options = {
          title: 'Select Image',
          // customButtons: [
          //   { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          // ],
          quality:1, maxWidth: 100, maxHeight: 100, allowsEditing: false,
          storageOptions: {
           
            skipBackup: true,
            path: 'images',
          },
      };
          ImagePicker.showImagePicker(options, response => {
          //console.log('Response = ', response);
     response.fileSize=10
          if (response.didCancel) {
           // console.log('User cancelled image picker');
          } else if (response.error) {
           // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
           // console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
           console.log('image.....',response)
            let source = { uri:  response.data };
           
            // imageUploadString = 'data:image/jpeg;base64,' + response.data;
            this.setState({
              image: 'data:image/jpeg;base64,' +source.uri,
              imageData:response
            });
            
          }
        });
      };
     createFormData = (photo) => {
      
      
        return data;
      };
    UNSAFE_componentWillMount(){
      Orientation.lockToPortrait()
      const {state} = this.props.navigation;
      this.setState({res:state.params.userDetails})
      console.log('details',state.params.course)
      this.setState({first_name:state.params.userDetails.first_name})
      this.setState({last_name:state.params.userDetails.last_name})
      this.setState({mail:state.params.userDetails.email})
      this.setState({age:state.params.userDetails.age})
      this.setState({gender:state.params.userDetails.gender})
      this.setState({grade:state.params.userDetails.grade})
      this.setState({location:state.params.userDetails.location})
      this.setState({Country:state.params.userDetails.country})
      this.setState({image:state.params.userDetails.user_image})
      this.setState({course:state.params.course})

    }
    UNSAFE_componentWillReceiveProps(){
      let {signUpDetail,loading,message,result,subscriptionDetails} = this.props;
     
    }
    signUpDetails=(alt,result)=>{
      if (result==true){
        
        // this.props.navigation.navigate('Login')
      }
      else{
        if (alt.length>0)
        alert(alt)
      }
      }
    subscriptionPlan=(index,status)=>{     
     (status==true && this.state.subscribeIndex==index)?this.setState({isSubscribe:false}):this.setState({isSubscribe:true})     
     this.state.subscribeIndex=index
    }
    
    submitData=async()=>{
      if(this.state.oldPass===''){
        alert('Please enter Old Password') 
      }
      else if(this.state.newPass===''){
        alert('Please enter New Password') 
      }
      else if(this.state.cnfrmPass===''){
        alert('Please enter Confirm Password') 
      }
      else if (this.state.cnfrmPass !== this.state.newPass){
        alert('Password & Confirm Password does not match')
      }  
      else{  
      this.setState({loading:true})
        const value = await AsyncStorage.getItem('userId')
  if(value !== null) {
        let params = {  
          'user_id': value,
          'old_password':this.state.oldPass,
          'new_password': this.state.newPass,
          
        };
        axios.post(Constant.BASEURL + Constant.CHANGE_PASSWORD, params, Utils.postHeader()).
            then((res) => {
                this.setState({ loading: false });
                let data = res.data;
                console.log(JSON.stringify(data)) 
                if (data.result) {
                 // console.log(JSON.stringify(data)) 
                   Alert.alert('Biawazo',data.message)
                  this.setState({isModalVisible:false})
                } else { 
                    Alert.alert('Biawazo', data.message, [{ text: 'OK' }], { cancelable: false });
                }
            }).catch((e) => {
              this.setState({ loading: false });
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
                    Alert.alert('Message', msg, [{ text: 'OK' }], { cancelable: false });
                } catch (e) { }
  
            });
        
          }
        }
    }
    pressForUpdate = async()=> {
      
     this.setState({loading:true})
        const value = await AsyncStorage.getItem('userId')
  if(value !== null) {
       
        var img=this.state.imageData
     
        const data = new FormData();
       
        data.append('user_image', {
          uri: this.state.imageData.uri,
          type: 'image/jpeg', // or photo.type
          name: 'mobile'
      });

      console.log(Constant.BASEURL + Constant.UPDATE_PROFILE +'?first_name='+(this.state.first_name)+'&last_name='+this.state.last_name+'&age='+this.state.age+'&country='+this.state.Country+'&gender='+this.state.gender+'&location='+this.state.location+'&grade='+this.state.grade+'&user_id='+value)
      fetch(Constant.BASEURL + Constant.UPDATE_PROFILE +'?first_name='+(this.state.first_name)+'&last_name='+this.state.last_name+'&age='+this.state.age+'&country='+this.state.Country+'&gender='+this.state.gender+'&location='+this.state.location+'&grade='+this.state.grade+'&user_id='+value, {
      method: "POST",
      body: (this.state.imageData.uri==null)?'':data
      })
      .then(response => response.json())
      .then(response => {
      console.log("upload succes", response);
      Alert.alert('Biawazo',response.message)
      this.setState({ loading: false })
      })
      .catch(error => {
      this.setState({ loading: false });
      console.log("upload error", error);
      alert("Upload failed!");
      });
      
        
          }
     
    } 
    handleOnPress = () => {
      alert('hello')
      // this.props.navigation.navigate('Login')
    }
  render() {
    let {signUpDetail,loading,message,result,subscriptionDetails} = this.props;
    if (subscriptionDetails==null){
      subscriptionDetails==[]
    }
    return (     
      <View style={GlobalStyle.container}> 
             
        <View style={GlobalStyle.subContainer}> 
        <Modal isVisible={this.state.isModalVisible} animationIn='zoomIn' animationOut='zoomOut'>
                      <View style={Styles.modalContainer}>
                        <View style={Styles.modalHead}>
                          <Text style={Styles.modalHeading}>Change Password</Text>
                          <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})} style={Styles.modalCross} >
                            <Image source={modalCloseImage}/>
                          </TouchableOpacity>
                        </View>

                        <TextInput style={Styles.modalInput} placeholder='Old Password*' selectionColor={color.green} placeholderTextColor={color.white} onChangeText={(text)=>this.setState({oldPass:text})} autoCapitalize={'none'} keyboardType={'default'} secureTextEntry={true}/>
                        <TextInput style={Styles.modalInput} placeholder='New Password*' selectionColor={color.green} placeholderTextColor={color.white} onChangeText={(text)=>this.setState({newPass:text})} autoCapitalize={'none'} keyboardType={'default'} secureTextEntry={true}/>
                        <TextInput style={Styles.modalInput} placeholder='Confirm New Password*' selectionColor={color.green} placeholderTextColor={color.white} onChangeText={(text)=>this.setState({cnfrmPass:text})} autoCapitalize={'none'} keyboardType={'default'} secureTextEntry={true}/>
                        <View ></View>

                        <TouchableOpacity onPress={()=>this.submitData()} style={Styles.modalButton}>
                          {/* <Image source={require('../../assets/icon-send.png')} /> */}
                          <Text style={Styles.modalSendText}>Submit</Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>  
        {(this.state.loading) && <Spinner
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }   
        <ScrollView contentContainerStyle={{width:responsiveWidth(100),height:responsiveHeight(115)}} >
        <ImageBackground source={blueBackground} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home',{'home':'profile'})} style={{marginRight:responsiveWidth(80),marginTop:responsiveHeight(2)}}><Image source={backImage} style={Styles.Searchimage}></Image></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.chooseFile()} style={{flexDirection:'row'}} ><ImageBackground style={{width:responsiveHeight(14),height:responsiveHeight(14),borderRadius:responsiveHeight(14)/2,marginTop:responsiveHeight(2.5),resizeMode:'cover'}} source={profileImage}><Image style={{width:responsiveHeight(16),height:responsiveHeight(16),borderRadius:responsiveHeight(16)/2,borderColor:color.lightgray,borderWidth:2,resizeMode:'cover'}} source={{uri:this.state.image}}/></ImageBackground></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LearningProgress',{'details':this.state.course})} style={[GlobalStyle.commonButton,{width:responsiveWidth(60), backgroundColor:color.white,marginTop:responsiveHeight(2)}]}><Text style={[Styles.loginButtonText,{color:color.purple}]}>My Progress</Text></TouchableOpacity>
        <View style={Styles.purpleView}>       
          <Text style={{fontFamily:'LakkiReddy',fontSize:responsiveFontSize(5),color:color.white,marginTop:responsiveHeight(3)}}>Edit Profile</Text>
        <View style={Styles.commontextFieldView}>
        <View style={[GlobalStyle.commontextFieldView,{width:responsiveWidth(40)}]}>
        <TextInput placeholder={'First Name'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.lightgray} returnKeyType={'next'} onChangeText={text=>this.setState({first_name:text})} value={this.state.first_name}></TextInput>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{width:responsiveWidth(40)}]}>
        <TextInput placeholder={'Last Name'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({last_name:text})} value={this.state.last_name}></TextInput>
        </View>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(2),width:responsiveWidth(90)}]}>       
        <TextInput placeholder={'Email'} style={[GlobalStyle.commonTextInput,{color:color.lightgray}]} placeholderTextColor={color.lightgray} editable={false} keyboardType={'email-address'} onChangeText={text=>this.setState({mail:text})}  value={this.state.mail}></TextInput>
        </View> 
        <View style={[Styles.commontextFieldView,{marginTop:responsiveHeight(2)}]}>
        <View style={[GlobalStyle.commontextFieldView,{width:responsiveWidth(40)}]}>
        <TextInput placeholder={'Age'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({age:text})} value={this.state.age}></TextInput>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{width:responsiveWidth(40)}]}>       
        <TextInput placeholder={'Gender'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.lightgray}  onChangeText={text=>this.setState({gender:text})} value={this.state.gender}></TextInput>
        </View> 
        </View>
        <View style={[Styles.commontextFieldView,{marginTop:responsiveHeight(2)}]}>
       
        <View style={[GlobalStyle.commontextFieldView,{width:responsiveWidth(40)}]}>       
        <TextInput placeholder={'Grade'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.lightgray}  onChangeText={text=>this.setState({grade:text})} value={this.state.grade}></TextInput>
        </View> 
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(2),width:responsiveWidth(40)}]}>       
        <TextInput placeholder={'Country'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({Country:text})} value={this.state.Country}></TextInput>
        </View> 
        </View>
        
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(2),width:responsiveWidth(90)}]}>       
        <TextInput placeholder={'Location'} style={GlobalStyle.commonTextInput} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({location:text})} value={this.state.location}></TextInput>
        </View> 
       
      
       
        <TouchableOpacity onPress={()=>this.pressForUpdate()} style={[GlobalStyle.commonButton,{width:responsiveWidth(90),marginTop:responsiveHeight(2)}]}><Text style={Styles.loginButtonText}>Submit</Text></TouchableOpacity> 
        <TouchableOpacity onPress={()=>this.setState({isModalVisible:true})} style={{width:responsiveWidth(90),marginTop:responsiveHeight(2),justifyContent:'center',alignItems:'center'}}><Text style={Styles.loginButtonText}>Change Password</Text></TouchableOpacity>
        </View>    
            
        </ImageBackground>  
      
        </ScrollView>    
        </View>
         
        
         
      </View>
      
    );
  }
}

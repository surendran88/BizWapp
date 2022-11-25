import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,Linking,FlatList,ScrollView,Alert,Platform,KeyboardAvoidingView} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';

import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import { thisTypeAnnotation } from '@babel/types';
import * as studyMaterialsAction from './../../redux/actions/studyMaterialsAction'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation';
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
const backgroundIg = require('../../../assets/home-bg.png');
const previewImage = require('../../../assets/PreviewImage.png');
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
const googlePlusImage = require('../../../assets/google-plus-logo.png');

const DATA = [{'key':'test'},{'key':'test1'},{'key':'test2'},{'key':'test3'},{'key':'test4'}];

 class StudyMaterials extends React.PureComponent{  
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
       index:0,
       isloading:true,
       res:[],
       studyData:{},
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
    let {studydata,studyloading,studymessage,studyresult}=this.props
   
 console.log(studydata)
    
      this.setState({isloading:studyloading})
   
  }
  sendMessage=()=>{
    let params = {'name':this.state.name,'email':this.state.email,'subject':this.state.subject,'message':this.state.message};
    let {actions} = this.props;
   
    actions.messageUs(params);
  }
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
  const {state} = this.props.navigation;
 this.state.res=state.params.details

 this.state.index=state.params.index
 this.state.isContact=true
 console.log('send',state.params.index)
 this.tabstatus(this.state.isContact,this.state.index,this.state.res[this.state.index])
}
showDetails=()=>{
  if(this.state.studyData.file_type=='1'){
    this.props.navigation.navigate('video',{'link':this.state.studyData.file_name,'type':this.state.studyData.file_type})
  }
 else if(this.state.studyData.file_type=='2'){
  this.props.navigation.navigate('pdf',{'link':this.state.studyData.file_name,'type':this.state.studyData.file_type})
  }
 else if(this.state.studyData.file_type=='3'){
  Linking.openURL(this.state.studyData.file_name)
}
  else{this.props.navigation.navigate('pdf',{'link':this.state.studyData.file_name,'type':this.state.studyData.file_type})}

  // (this.state.studyData.file_type=='1')?this.props.navigation.navigate('video',{'link':this.state.studyData.file_name,'type':this.state.studyData.file_type}):this.props.navigation.navigate('pdf',{'link':this.state.studyData.file_name,'type':this.state.studyData.file_type})
}
tabstatus=(status,count,data,user_id)=>{
  
  if (this.state.index==count){
if(status==true){
  this.setState({isContact:true})
}else{
  (status==true)?this.setState({isContact:false}):this.setState({isContact:true})
}
  
  }else{
    this.setState({isContact:false})
    this.setState({isContact:true})
  }
this.setState({index:count})
this.setState({studyData:data})
console.log(data)
this.getData(data)

}
getData = async (data) => {
  
    const value = await AsyncStorage.getItem('userId')
    if(value !== null) {
      let params = {'user_id':value,'lesson_id':data.lesson_id,'study_material_id':data.study_material_id};
      this.setState({isloading:true})
  let {actions} = this.props;
 
    actions.getStudyMaterialsData(params);
    }
  
}
navigateFromSideMenu=(page)=>{
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate(page)
}
  //Design
  render() {
    let {studydata,studyloading,studymessage,studyresult,responseData}=this.props
    if(studydata==null){
      
    }
    else{
      if(studymessage=='Study material completed'){
      (studydata.is_complete==1)&&Alert.alert('Congratulations','Your module is successfully completed!')
      
    }
    this.state.isloading=studyloading
    }
    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
        <KeyboardAvoidingView style={{width:responsiveWidth(100)}} behavior='position' enabled>     
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginLeft:responsiveWidth(4)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),marginRight:responsiveWidth(28),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1)}}>Igborizing Fun</Text>
            </ImageBackground>          
        </View>
      
        <View style={[Styles.headerView]}>
        <ScrollView horizontal={true}> 
        <FlatList  
        data={this.state.res}  
        numColumns={this.state.res.length}
                renderItem={({item,index}) =>  
         <View style={{height:responsiveHeight(5),justifyContent:'center',alignItems:'center',marginLeft:responsiveWidth(5)}}>
         <TouchableOpacity onPress={()=>this.tabstatus(this.state.isContact,index,item)} style={(this.state.isContact && index==this.state.index)?{borderBottomWidth:responsiveWidth(1),borderBottomColor:color.purple}:null}><Text style={{fontSize:responsiveFontSize(3),color:(this.state.isContact && index==this.state.index)?color.purple:color.lightgray,fontFamily:'LakkiReddy'}}>{item.study_title}</Text></TouchableOpacity>
         </View>
         } 
                    ItemSeparatorComponent={this.renderSeparator}  
                />
        </ScrollView> 
        </View>
        <View style={{width:responsiveWidth(100),height:responsiveHeight(0.5),backgroundColor:color.lightgray,justifyContent:'flex-start',alignItems:'flex-start'}}></View>
        <ImageBackground style={{backgroundColor:(this.state.studyData.file_type==3)?color.white:color.black,justifyContent:'center',alignItems:'center',height:responsiveHeight(40),width:'100%'}} imageStyle={{resizeMode:'contain'}} source={{uri:(this.state.studyData.file_type==4)?this.state.studyData.file_name:this.state.studyData.privew_image}} >
        <TouchableOpacity onPress={()=>this.showDetails()}>{(this.state.studyData.file_type==3)?<View style={{backgroundColor:color.orange,width:responsiveWidth(50),borderRadius:20,justifyContent:'center',alignItems:'center',height:responsiveHeight(7)}}><Text style={{color:color.white,fontSize:responsiveFontSize(3)}}>CLICK HERE</Text></View>:<Image source={previewImage}/>}</TouchableOpacity>                 
        </ImageBackground>
        
        
       
        <Text style={{fontSize:responsiveFontSize(3),color:color.purple,fontFamily:'LakkiReddy',marginLeft:responsiveWidth(5),marginTop:responsiveHeight(2)}}>{this.state.studyData.study_title}</Text>
        <Text style={[{marginLeft:responsiveWidth(1),fontSize:responsiveFontSize(1.8),color:color.darkGray,fontFamily:'OpenSans',marginLeft:responsiveWidth(5),marginBottom:responsiveHeight(5)}]}>{this.state.studyData.study_description}</Text>
        </ImageBackground>
       
        </KeyboardAvoidingView>
        </View>
       
      </View>
    );
  }
}
const mapStateToProps = state => ({


  studydata : state.studyMaterialsApiResponseDataConfig.studydata,
  studyloading : state.studyMaterialsApiResponseDataConfig.studyloading,
  studymessage : state.studyMaterialsApiResponseDataConfig.studymessage,
  studyresult : state.studyMaterialsApiResponseDataConfig.studyresult,
  
 


});

const ActionCreators = Object.assign(
  {}, 
  studyMaterialsAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(StudyMaterials)
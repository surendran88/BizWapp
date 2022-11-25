import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,ScrollView,TextInput,FlatList,Platform,ActivityIndicator,Alert,Linking} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as HomeActions from './../../redux/actions/HomeAction'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import Utils from '../../Utils/utils';
import Constant from './../../redux/constants';
import Orientation from 'react-native-orientation';
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
const backgroundIg = require('../../../assets/home-bg.png');
const menuIg = require('../../../assets/menu-bg.png');
const headerImage = require('../../../assets/top-bar.png');
const beginerImage = require('../../../assets/block-beginer.png');
const expertImage = require('../../../assets/block-expert.png');
const igboImage = require('../../../assets/block-igbo.png');
const intermediateImage = require('../../../assets/block-intermediate.png');
const menuImage = require('../../../assets/btn-menu.png');
const speakImage = require('../../../assets/icon-speak.png');
const readImage = require('../../../assets/icon-read.png');
const writeImage = require('../../../assets/icon-write.png');
const profileImage = require('../../../assets/menu-profileimage.png');
const menuVirtualLanguageImage = require('../../../assets/menu-vertual-language.png');
const menuGlobalLanguageImage = require('../../../assets/menu-global-lanoguage.png');
const menuSubscriptionImage = require('../../../assets/menu-subscription.png');
const menuAboutUsImage = require('../../../assets/menu-about-us.png');
const menuFaqImage = require('../../../assets/Faq.png');
const menuEventImage = require('../../../assets/calendar.png');
const menuMediaGalleryImage = require('../../../assets/menu-media-gallery.png');
const menuBlogImage = require('../../../assets/menu-blog.png');
const menuContactusImage = require('../../../assets/menu-contactus.png');
const menuLogoutImage = require('../../../assets/menu-logout.png');
const profileImageView = require('../../../assets/profile.png');
const lesson1Image = require('../../../assets/lesson-block1.png');
const lesson2Image = require('../../../assets/lesson-block2.png');
const lesson3Image = require('../../../assets/lesson-block3.png');
const lesson4Image = require('../../../assets/lesson-block4.png');
const lesson5Image = require('../../../assets/lesson-block5.png');
const lesson6Image = require('../../../assets/lesson-block6.png');
const lesson7Image = require('../../../assets/lesson-block7.png');
const lesson8Image = require('../../../assets/lesson-block8.png');
const lesson9Image = require('../../../assets/lesson-block9.png');
const lesson10Image = require('../../../assets/lesson-block10.png');
const imageArray=[{'image':lesson1Image},{'image':lesson2Image},{'image':lesson3Image},{'image':lesson4Image},{'image':lesson5Image},{'image':lesson6Image},{'image':lesson7Image},{'image':lesson8Image},{'image':lesson9Image},{'image':lesson10Image}]
 class Homepage extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isIgboVisible:false,
       res:[],
       standId:0,
       sectionId:0,
       isLoading:false,
       userDtls:{},
       subData:[],
       course:[]
       
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
 
  

componentDidMount(){
 
    this.getUserData()
}
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
  let params = {};
  let {actions} = this.props;
 
    actions.getHomeData(params);
}
// getUserData=async()=>{
//   const value = await AsyncStorage.getItem('userId')
//   if(value !== null) {
//     let params = {'user_id':value};
//     let {actions} = this.props;
   
//       actions.UserDetails(params);
//   }
// }
clickOnCategories=(index,des)=>{
  console.log('section',index)
  this.setState({isModalVisible:false})
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate('LessonListing',{'sectionId':index,'standardId':this.state.standId,'description':des})
 
}
navigateFromSideMenu=(page)=>{
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate(page)
}
callLogoutService=async()=>{
  Alert.alert(
    'Biawazo',
    'Do you want to Logout?',
    [
      {text: 'OK', onPress: () => this.Logout()},
     
      {text: 'CANCEL', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
  
  
  
}
getUserData = async() =>{
    
  this.setState({isLoading:true})
  const value = await AsyncStorage.getItem('userId')
  
  let params = {'user_id':value};
  
  axios.post(Constant.BASEURL + Constant.USER_DETAILS, params,Utils.postHeader()).
      then((res) => {
          this.setState({ isLoading: false });
          let data = res.data;
          if (data) {
            console.log(JSON.stringify(data))                                    
              if (data){
             if(data.result){
              this.setState({userDtls:data.data.user_data})
              this.setState({course:data.data.lesson_list})
               
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
Logout = async() =>{
    
  this.setState({isLoading:true})
  const value = await AsyncStorage.getItem('userId')
  
  let params = {'user_id':value};
  
  axios.post(Constant.BASEURL + Constant.LOGOUT, params,Utils.postHeader()).
      then((res) => {
          this.setState({ isLoading: false });
          let data = res.data;
          if (data) {
            console.log(JSON.stringify(data))                                    
              if (data){
             if(data.result){
              Alert.alert('Biawazo',data.message)
               this.log()
              
               
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
log=async()=>{
  this.setState({isSideBarVisible:false})
  this.setState({isLoading:false})
  this.props.navigation.navigate('Login')
  try {
    await AsyncStorage.removeItem('userId');
    
    return true;
}
catch(exception) {
    return false;
}
  
}
userDetails=()=>{
  this.setState({isSideBarVisible:false})
   this.props.navigation.navigate('Profile',{'userDetails':this.state.userDtls,'course':this.state.course})
}
UNSAFE_componentWillReceiveProps(){
  let {data,loading,message,result,userDetails,userLoading,userMessage,userResult}=this.props
  console.log(data,loading,message,result,userDetails,userLoading,userMessage,userResult)
  this.getUserData()
  if(userResult==true){
    this.setState({userDtls:userDetails.user_data})
  }
if (result==true){
  this.setState({res:data})
 
}


}
  render() {
    let {data,igbo_module_list,loading,message,result,userDetails,userLoading,userMessage,userResult}=this.props
    
    
    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
       
        <Modal style={{marginLeft:responsiveWidth(-0.05),width:responsiveWidth(100),flexDirection:'row'}}  isVisible={this.state.isSideBarVisible} coverScreen={true} animationIn='slideInLeft' hideModalContentWhileAnimating={true} useNativeDriver={true} animationOutTiming={1000} animationOut={'slideOutLeft'}>
        
                      <View style={Styles.sideBarView}>                        
                        {/* <TouchableOpacity onPress={()=>this.clickOnCategories()}><Image source={speakImage}/></TouchableOpacity> */}
                        <ImageBackground source={menuIg} style={{width:'100%',height:'100%',alignItems:'center',marginTop:Platform.OS==='ios'?responsiveHeight(4.2):null}} imageStyle={{resizeMode:'stretch'}}>
                          <ScrollView contentContainerStyle={{justifyContent:'flex-start',alignItems:'center',height:responsiveHeight(120)}} contentInset={{top:0,bottom:responsiveHeight(10)}}>
                          <TouchableOpacity onPress={()=>this.userDetails()}><ImageBackground style={{width:responsiveHeight(15),height:responsiveHeight(15),borderRadius:responsiveHeight(15)/2,marginTop:responsiveHeight(5),resizeMode:'cover'}} source={profileImageView}><Image source={{uri:this.state.userDtls.user_image}} style={{width:responsiveHeight(16),height:responsiveHeight(16),borderRadius:responsiveHeight(16)/2}}/></ImageBackground></TouchableOpacity>
                          <Text style={[Styles.learningtextView,{marginTop:responsiveHeight(1)}]}>{this.state.userDtls.first_name} {this.state.userDtls.last_name}</Text>
                          <TouchableOpacity onPress={()=>this.navigateFromSideMenu('HomePage')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(3)}}>
                            <Image source={menuVirtualLanguageImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Virtual Language {'\n'} Learning</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={()=>Linking.openURL('https://www.biawazo.com/GLL')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(2)}}>
                            <Image source={menuGlobalLanguageImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Global Language {'\n'} Learning</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={()=>this.navigateFromSideMenu('Subscription')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(1)}}>
                            <Image source={menuSubscriptionImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Subscribe</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.navigateFromSideMenu('AboutUs')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(1)}}>
                            <Image source={menuAboutUsImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.navigateFromSideMenu('MediaGallery')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(1)}}>
                            <Image source={menuMediaGalleryImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Media Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.navigateFromSideMenu('CalendarEvents')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(1)}}>
                            <Image source={menuEventImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Calendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.navigateFromSideMenu('Blog')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(2)}}>
                            <Image source={menuBlogImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Blog</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.navigateFromSideMenu('ContactUs')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(1)}}>
                            <Image source={menuContactusImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Contact Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.navigateFromSideMenu('Faq')} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(1)}}>
                            <Image source={menuFaqImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>FAQ</Text>
                            </TouchableOpacity>
                          
                            <TouchableOpacity onPress={()=>this.callLogoutService()} style={{flexDirection:'row',width:responsiveWidth(70),marginTop:responsiveHeight(1)}}>
                            <Image source={menuLogoutImage} style={{marginLeft:responsiveWidth(10),marginTop:responsiveHeight(1)}}/>
                            <Text style={[Styles.learningtextView,{marginLeft:responsiveWidth(3),marginTop:responsiveHeight(1),fontSize:responsiveFontSize(2.2)}]}>Logout</Text>
                            </TouchableOpacity>
                            </ScrollView>
                        </ImageBackground>                    
                      </View>  
                      <TouchableOpacity style={{width:responsiveWidth(30),height:responsiveHeight(100)}} onPress={()=>this.setState({isSideBarVisible:false})} activeOpacity={1}>
                      </TouchableOpacity>                    
                    </Modal>
        <Modal isVisible={this.state.isModalVisible} animationIn='zoomIn' animationOut='zoomOut' hideModalContentWhileAnimating={true} useNativeDriver={true} animationOutTiming={1000}>
        <FlatList contentContainerStyle={{justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(4)}} data={this.state.subData} 
                    renderItem={({item,index}) => 
                    <TouchableOpacity style={{width:responsiveWidth(100)}} onPress={()=>this.setState({isModalVisible:false})} activeOpacity={1}>
                      <View style={Styles.modalContainer}>
                        <TouchableOpacity onPress={()=>this.clickOnCategories(index,item.description)}><Image source={(index==0) && speakImage ||(index==1) && readImage || (index==2) && writeImage}/></TouchableOpacity>
   
    <Text style={Styles.learningtextView}>{item.section_name}</Text>
    <Text style={Styles.learningtextView}>{item.section_name_in_other}</Text>
    <View style={{height:responsiveHeight(5)}}></View>
                      </View>
                      
                      </TouchableOpacity>      
                            }  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
       
       
        
                    </Modal> 
                    <Modal  isVisible={this.state.isIgboVisible} animationIn='zoomIn' animationOut='zoomOut'  hideModalContentWhileAnimating={true} useNativeDriver={true} animationOutTiming={1000}>
        <TouchableOpacity style={{width:responsiveWidth(90),height:responsiveHeight(100),justifyContent:'center',alignItems:'center'}} onPress={()=>this.setState({isIgboVisible:false})} activeOpacity={1}>
<ScrollView>
        <FlatList contentContainerStyle={{justifyContent:'center',alignItems:'center',width:responsiveWidth(100)}} data={igbo_module_list}  
                    numColumns={2}
                    renderItem={({item,index}) =>                    
                    <View style={{justifyContent:'center',alignItems:'center',marginRight:responsiveWidth(7)}}> 
                     <ImageBackground source={imageArray[index].image} style={{width:responsiveWidth(40),height:responsiveHeight(20),justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(2)}} imageStyle={{resizeMode:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LessonDetails',{'type':'igbo','lesson':item.lesson_name,'lessonId':item.lesson_id,'description':this.state.description}) && this.setState({isIgboVisible:false})} style={{justifyContent:'center',alignItems:'center',height:responsiveHeight(10)}}><Text style={{textAlign:'center',color:color.white,fontWeight:'bold',width:responsiveWidth(30)}}>{item.lesson_name}</Text></TouchableOpacity>  
                     </ImageBackground>
                 
                    </View>} 
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
                     
                     </ScrollView>
                      </TouchableOpacity>
                    </Modal> 
                    {(this.state.isLoading) && <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   } 
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.setState({isSideBarVisible:true})} style={{marginLeft:responsiveWidth(4)}}><Image source={menuImage}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),marginRight:responsiveWidth(30),color:color.white,fontFamily:'LakkiReddy'}}>Start Learning</Text></ImageBackground>          
        </View>
        <Text style={Styles.homeText}>Virtual Language</Text>
        <View style={Styles.purpleView}>
         <FlatList  data={data} 
                    renderItem={({item,index}) => 
                    <View style={[Styles.learningView,{backgroundColor:(index==0)?color.blue:null||(index==1)?color.orange:null||(index==2)?color.yellow:null||(index==3)?color.homeGreen:null}]}> 
                    <View style={[Styles.learningView1]}>                      
                        <Text style={Styles.learningCategoryView}>{item.name_in_english}</Text>
                        <Text style={Styles.learningCategoryTextView}>{item.description}</Text>
                        <View style={{flexDirection:'row', marginBottom:responsiveHeight(1),}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LessonListing',{'type':'lesson','sectionId':index+1})} style={[Styles.modalButton]}>                         
                        <Text style={[Styles.modalSendText,{color:(index==0)?color.blue:null||(index==1)?color.orange:null||(index==2)?color.yellow:null||(index==3)?color.homeGreen:null}]}>Lessons</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({isModalVisible:true,standId:index+1,subData:item.sections})} style={[Styles.modalButton]}>                         
                        <Text style={[Styles.modalSendText,{color:(index==0)?color.blue:null||(index==1)?color.orange:null||(index==2)?color.yellow:null||(index==3)?color.homeGreen:null}]}>Activity</Text>
                        </TouchableOpacity>
                        </View>
                        {(index==3)&& <View style={{flexDirection:'row', marginBottom:responsiveHeight(1),}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LessonListing',{'type':'cat','sectionId':3})} style={[Styles.modalButton]}>                         
                        <Text style={[Styles.modalSendText,{color:(index==0)?color.blue:null||(index==1)?color.orange:null||(index==2)?color.yellow:null||(index==3)?color.homeGreen:null}]}>Learning Resources</Text>
                        </TouchableOpacity>
                        
                        </View> 
                        
                        }  
                        {(index==3)&& <View style={{flexDirection:'row', marginBottom:responsiveHeight(1),}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LessonListing',{'type':'cat','sectionId':4})} style={[Styles.modalButton]}>                         
                        <Text style={[Styles.modalSendText,{color:(index==0)?color.blue:null||(index==1)?color.orange:null||(index==2)?color.yellow:null||(index==3)?color.homeGreen:null}]}>Social Spot</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({isIgboVisible:true})} style={[Styles.modalButton]}>                         
                        <Text style={[Styles.modalSendText,{color:(index==0)?color.blue:null||(index==1)?color.orange:null||(index==2)?color.yellow:null||(index==3)?color.homeGreen:null}]}>Seasonal</Text>
                        </TouchableOpacity>
                        
                        </View> 
                        
                        }          
                    </View>
                    
                    <View style={[Styles.learningImageView]}> 
                    <ImageBackground source={{uri:item.image}} style={{width:'100%',height:'100%',flex:1,justifyContent:'center',alignItems:'flex-start'}} imageStyle={{resizeMode:'stretch'}}>
                    </ImageBackground>
                   </View>
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


  data : state.homeApiResponseDataConfig.data,
  igbo_module_list : state.homeApiResponseDataConfig.igbo_module_list,
  loading : state.homeApiResponseDataConfig.loading,
  message : state.homeApiResponseDataConfig.message,
  result : state.homeApiResponseDataConfig.result,
  userDetails : state.homeApiResponseDataConfig.userDetails,
  userLoading : state.homeApiResponseDataConfig.userLoading,
  userMessage : state.homeApiResponseDataConfig.userMessage,
  userResult : state.homeApiResponseDataConfig.userMessage,
 


});

const ActionCreators = Object.assign(
  {}, 
  HomeActions,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(Homepage)
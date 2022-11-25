import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform,ScrollView,Alert,Linking, Keyboard} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as blogListingAction from './../../redux/actions/blogListingAction'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors';
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
const adminImage = require('../../../assets/icon-admin.png');
const commentImage = require('../../../assets/icon-comment.png');
const newsImage = require('../../../assets/icon-news.png');
const blogImage = require('../../../assets/blog-img.png');
const searchImage = require('../../../assets/icon-search.png');
const filterImage = require('../../../assets/icon-filter.png');
const menuImage = require('../../../assets/btn-menu.png');
const speakImage = require('../../../assets/icon-speak.png');
const readImage = require('../../../assets/icon-read.png');
const writeImage = require('../../../assets/icon-write.png');
const profileImage = require('../../../assets/profile-img.png');
const menuVirtualLanguageImage = require('../../../assets/menu-vertual-language.png');
const menuGlobalLanguageImage = require('../../../assets/menu-global-lanoguage.png');
const menuSubscriptionImage = require('../../../assets/menu-subscription.png');
const menuAboutUsImage = require('../../../assets/menu-about-us.png');
const menuMediaGalleryImage = require('../../../assets/menu-media-gallery.png');
const menuBlogImage = require('../../../assets/menu-blog.png');
const menuContactusImage = require('../../../assets/menu-contactus.png');
const menuLogoutImage = require('../../../assets/menu-logout.png');
const previewImage = require('../../../assets/PreviewImage.png');
 class BlogComent extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isReadMore:false,
       res:[],
       item:0,
       title:'',
       description:'',
       img:'',
       name:'',
       email:'',
       website:'',
       comment:'',
       blgId:'',
       isloading:false,
       blog_type:'',
       blog_comments:'',
       preview:''
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
  let {data,loading,message,result}=this.props
  if (result){
    this.setState({res:data})
    console.log(data)
  }
}
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
  const {state} = this.props.navigation;
  this.state.title=state.params.title
  this.state.description=state.params.description
  this.state.img=state.params.image
  this.state.blgId=state.params.blogId
  this.state.blog_type=state.params.type
  this.state.blog_comments=state.params.comment
  this.state.preview=state.params.preview
}
SendComment=()=> {
 
  if (this.state.name === '') {
    Alert.alert('Biawazo','Please enter Name');
  } 
  else if(this.state.email === ''){
    Alert.alert('Biawazo','Please enter Email');
  } 
  // else if(this.state.website === ''){
  //   Alert.alert('Biawazo','Please enter Website');
  // } 
  else if(this.state.comment === ''){
    Alert.alert('Biawazo','Please enter Comment');
  } 
  else if (Emailvalidator.isEmailValid(this.state.email)==false) {
    Alert.alert('Biawazo','Please enter valid email address');
  }
  else{
 
    this.setState({isloading:true})
   
   this.BlogMessage()
  }
  
} 
BlogMessage = () =>{
    
  
  let params = {'blog_id':this.state.blgId,'name':this.state.name,'email':this.state.email,'website':this.state.website,'comment':this.state.comment};
  axios.post(Constant.BASEURL + Constant.BLOG_COMMENT, params,Utils.postHeader()).
      then((res) => {
          this.setState({ isLoading: false });
          let data = res.data;
          if (data) {
            console.log(JSON.stringify(data))                                    
              if (data){
             if(data.result){
              Alert.alert('Biawazo',data.message)
               
                this.clearText()
               
               
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
clearText=()=>{
  this.setState({isloading:false})
  this.setState({name:'',email:'',website:'',comment:''})
}
clickOnCategories=()=>{
  this.setState({isModalVisible:false})
  this.props.navigation.navigate('LessonListing')
}
navigateFromSideMenu=(page)=>{
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate(page)
}
ClickReadMore=(read,index)=>{
(read==true)?this.setState({isReadMore:false}):this.setState({isReadMore:true})
this.state.item=index
}
  //Design
  render() {
    let {data,loading,message,result}=this.props
    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
           {(this.state.isloading) && <Spinner
          visible={this.state.isloading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }            
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}><Text style={{fontSize:responsiveFontSize(3),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1)}}>Blog Detail</Text></ImageBackground>          
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Blog',{'blog':'blog'})} style={{left:responsiveWidth(4),top:responsiveHeight(2),padding:responsiveHeight(1),position:'absolute'}}><Image source={backIg}></Image></TouchableOpacity>
        </View>
        <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{justifyContent:'flex-start',alignItems:'flex-start'}}contentInset={{top:0,bottom:responsiveHeight(20)}}> 
        
        
        {(this.state.blog_type=='1') ?<ImageBackground style={{backgroundColor:color.black,marginTop:responsiveHeight(1),justifyContent:'center',alignItems:'center',height:responsiveHeight(30),width:'100%'}} imageStyle={{resizeMode:'contain'}} source={{uri:this.state.preview}} >
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('video',{'link':this.state.link,'type':1})}><Image source={previewImage}/></TouchableOpacity>                 
                    
</ImageBackground>:<Image source={{uri:this.state.img}} style={{width:responsiveWidth(90),marginLeft:responsiveWidth(5),height:responsiveHeight(30),marginTop:responsiveHeight(3)}} resizeMode={'contain'}/>} 
{(this.state.blog_type==3) && <TouchableOpacity onPress={()=>Linking.openURL(this.state.img)} style={{backgroundColor:color.orange,left:responsiveWidth(25),width:responsiveWidth(50),position:'absolute',top:responsiveHeight(15),borderRadius:20,justifyContent:'center',alignItems:'center',height:responsiveHeight(7)}}><Text style={{color:color.white,fontSize:responsiveFontSize(3)}}>CLICK HERE</Text></TouchableOpacity>}

        <Text style={{fontSize:responsiveFontSize(3),color:color.purple,fontFamily:'LakkiReddy',marginLeft:responsiveWidth(5),marginTop:responsiveHeight(2)}}>{this.state.title}</Text>
        <View style={Styles.adminView}>
                      <Image source={adminImage}/>
                      <Text style={[Styles.adminTextView,{marginLeft:responsiveWidth(1)}]}>Admin</Text>
                      </View>
        <Text style={Styles.descriptionText}>{this.state.description}</Text>
        <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(2.5),marginLeft:responsiveWidth(4),marginTop:responsiveHeight(2),height:responsiveHeight(5),color:color.purple,textAlign:'left',fontFamily:'LakkiReddy'}]}>{this.state.blog_comments.length} {(this.state.blog_comments.length>1) ?'Comments':'Comment'}</Text>
        <FlatList style={{marginTop:responsiveHeight(1)}}  data={this.state.blog_comments} 
                    renderItem={({item,index}) => 
                    <View style={{width:responsiveWidth(80),justifyContent:'flex-start',alignItems:'flex-start',marginLeft:responsiveWidth(5)}}> 
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(1.5),marginTop:responsiveHeight(2),height:responsiveHeight(5),color:color.orange,textAlign:'left',fontFamily:'LakkiReddy'}]}>{item.name}</Text>
                <Text style={[Styles.descriptionText,{fontSize:responsiveFontSize(1.5),fontWeight:'bold'}]}>{item.created_date_time}</Text>
                <Text style={[Styles.descriptionText,{marginTop:responsiveHeight(1)}]}>{item.comment}</Text>

                   </View>        
                            
                          }  
                    ItemSeparatorComponent={this.renderSeparator}  
                /> 
        <View style={{justifyContent:'center',alignItems:'flex-start',width:responsiveWidth(90),height:responsiveHeight(70),marginLeft:responsiveWidth(5)}}>
                <Text style={[Styles.learningtextView,{fontSize:responsiveFontSize(3),marginTop:responsiveHeight(2),height:responsiveHeight(5),color:color.orange,textAlign:'left',fontFamily:'LakkiReddy'}]}>Leave A Reply</Text>
                
                <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(90)}]}>
        
        <TextInput placeholder={'Name*'} style={[GlobalStyle.commonTextInput]} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({name:text})} value={this.state.name}></TextInput>
        </View>
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(90)}]} >
        
        <TextInput placeholder={'Email*'} style={[GlobalStyle.commonTextInput]} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({email:text})} keyboardType={'email-address'} value={this.state.email}></TextInput>
        </View>
        {/* <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(90)}]}>
   
        <TextInput placeholder={'Website*'} style={[GlobalStyle.commonTextInput]} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({website:text})} value={this.state.website}></TextInput>
        </View> */}
        <View style={[GlobalStyle.commontextFieldView,{marginTop:responsiveHeight(1.5),justifyContent:'flex-start',borderWidth:0.7,borderColor:color.lightgray,width:responsiveWidth(90),height:responsiveHeight(20),alignItems:'flex-start'}]}>
        
        <TextInput placeholder={'Comments*'} style={[GlobalStyle.commonTextInput,{textAlignVertical:'top',marginTop:responsiveHeight(1.5),height:responsiveHeight(15),justifyContent:'flex-start'}]} multiline={true} numberOfLines={10} placeholderTextColor={color.lightgray} onChangeText={text=>this.setState({comment:text})} value={this.state.comment}></TextInput>
        </View>
        <TouchableOpacity onPress={()=>{this.SendComment()}}  style={[GlobalStyle.commonButton,{marginTop:responsiveHeight(2),width:responsiveWidth(90)}]}><Text style={{color:color.white,fontSize:responsiveFontSize(2)}}>Submit</Text></TouchableOpacity>
        
               </View>
     </ScrollView>
        </ImageBackground>
       
        
        </View>
   
      </View>
    );
  }
}
const mapStateToProps = state => ({


  data : state.blogListingApiResponseDataConfig.data,
  loading : state.blogListingApiResponseDataConfig.loading,
  message : state.blogListingApiResponseDataConfig.message,
  result : state.blogListingApiResponseDataConfig.result,
  
 


});

const ActionCreators = Object.assign(
  {}, 
  blogListingAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(BlogComent)
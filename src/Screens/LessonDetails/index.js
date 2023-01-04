import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform,ScrollView,Linking} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as lessonDetailsAction from '../../redux/actions/lessonDetailsAction'; 
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import Constant from './../../redux/constants/index';
import axios from 'axios';
import Pdf from 'react-native-pdf';
import Utils from '../../Utils/utils';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from 'react-native-image-progress';
import Orientation from 'react-native-orientation'; 


const previewImage = require('../../../assets/PreviewImage.png');
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
const backgroundIg = require('../../../assets/home-bg.png');
const backIg = require('../../../assets/btn-back.png');
const headerImage = require('../../../assets/top-bar.png');
const videoImage = require('../../../assets/video-img.png');
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
var details={}
 class LessonDetails extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isReadMore:false,
       lesson:'',
       LessonDetails:{},
       res:{},
       isloading:true,
       status:'',
       igboData:[],
       desDetails:''
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
  
  checkSubscription = async () => {
    const value = await AsyncStorage.getItem('userId')
    if(value !== null) {
      let params = {'user_id':value};
      this.setState({isloading:true})
  let {actions} = this.props;
    actions.getSubscriptionDetails(params);
    }

}
componentDidMount(){
  this.checkSubscription()
}
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
  const {state} = this.props.navigation;
  this.state.lesson=state.params.lesson
this.state.desDetails=state.params.description
if(state.params.type=='igbo'){
  let params = {'lesson_id':state.params.lessonId};
  console.log('lesoon....',state.params.lessonId,'des..',state.params.description)
  let {actions} = this.props;
 
    actions.getigbolessonDetails(params);
}
else{
  let params = {'lesson_id':state.params.lessonId};
  console.log('lesoon....',state.params.lessonId,'des..',state.params.description)
  let {actions} = this.props;
 
    actions.getlessonDetails(params);
}
    }
    UNSAFE_componentWillReceiveProps(){
      let {ldetailsdata,ldetailsmessage,ldetailsloading,ldetailsresult,submessage,subresult}=this.props
      if(submessage=='Subscription expired'){
        this.setState({status:'expire'})
      }
      if(submessage=='Subscription valid'){
        this.setState({status:'valid'})
      }
      if (ldetailsdata == null){
        this.state.res={}
      }
      else{
        
        if(ldetailsdata.data_list.length>0){
          this.setState({igboData:ldetailsdata.data_list})
          console.log('IgboData',this.state.igboData)
          this.setState({res:ldetailsdata.data_list[0]})
          this.setState({isloading:false})
        
         
                }
                this.setState({isloading:false})
       
     
      }
    }
    clickToShow=()=>{
      if(this.state.res.file_type=='1'){
        this.props.navigation.navigate('video',{'link':this.state.res.file_name,'type':this.state.res.file_type})
      }
     else if(this.state.res.file_type=='2'){
      this.props.navigation.navigate('pdf',{'link':this.state.res.file_name,'type':this.state.res.file_type})
      }
     else if(this.state.res.file_type=='3'){
      Linking.openURL(this.state.res.file_name)
    }
      else{this.props.navigation.navigate('pdf',{'link':this.state.res.file_name,'type':this.state.res.file_type})}
    }
clickOnCategories=()=>{
  this.setState({isModalVisible:false})
  this.props.navigation.navigate('LessonListing')
}
navigateFromSideMenu=(page)=>{
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate(page)
}
ClickReadMore=(read)=>{
(read==true)?this.setState({isReadMore:false}):this.setState({isReadMore:true})
}
  //Design
  render() {
    let {ldetailsdata,ldetailsmessage,ldetailsloading,ldetailsresult,submessage,subresult}=this.props
    if(submessage=='Subscription expired'){
      this.state.status='expire'
    }
    if(submessage=='Subscription valid'){
      this.state.status='valid'
    }
    if (ldetailsdata == null){
      this.state.res={}
    }
    else{
      
      if(ldetailsdata.data_list.length>0){
        this.state.igboData=ldetailsdata.data_list
        console.log('IgboData',this.state.igboData)
         this.state.res=ldetailsdata.data_list[0]
         this.state.isloading=false
       
              }
              this.state.isloading=false
     
   
    }

    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
       {this.state.isloading && <Spinner
          visible={this.state.isloading}
          textContent={'Loding...'}
          textStyle={{color: color.white}}
       /> }            
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={[Styles.bgView]}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            
            <Text style={{fontSize:responsiveFontSize(2.5),color:color.white,marginTop:responsiveHeight(1),fontFamily:'LakkiReddy',width:responsiveWidth(60),textAlign:'center'}}>{this.state.lesson}</Text>
            </ImageBackground>
            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{position:'absolute',left:responsiveWidth(3),padding:responsiveWidth(2)}}><Image source={backIg}></Image></TouchableOpacity>          
        </View>
        <ScrollView contentContainerStyle={{width:responsiveWidth(90)}}>
        <View style={Styles.purpleView}>
                  
                    <View style={Styles.learningView}> 
                    <View style={[Styles.freeTakeView]}>
                    
                    {(this.state.res.study_material_id==null)?null:<TouchableOpacity onPress={()=>{(this.state.status=='expire')?this.props.navigation.navigate('Subscription'):this.props.navigation.navigate('StudyMaterials',{'study_material_id':this.state.res.study_material_id,'details':ldetailsdata.data_list,'index':0})}}  style={Styles.takeButton}><Text style={{fontSize:responsiveFontSize(2.6),color:color.white,fontFamily:'LakkiReddy', marginTop:responsiveHeight(1)}}>Take this Lesson</Text></TouchableOpacity>}
                    {/* {(this.state.res.study_material_id==null)?null:<TouchableOpacity onPress={()=>{this.props.navigation.navigate('StudyMaterials',{'study_material_id':this.state.res.study_material_id,'details':ldetailsdata.data_list,'index':0})}}  style={Styles.takeButton}><Text style={{fontSize:responsiveFontSize(2.6),color:color.white,fontFamily:'LakkiReddy', marginTop:responsiveHeight(1)}}>Take this Lesson</Text></TouchableOpacity>} */}

                    </View>     
                    <View style={(this.state.res.study_material_id==null)?[Styles.VideoView,{height:responsiveHeight(0)}]:Styles.VideoView}>               
                    
                    <ImageBackground style={{backgroundColor:(this.state.res.file_type==3)?color.white:color.black,justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}} imageStyle={{resizeMode:'contain'}} source={{uri:(this.state.res.file_type==4)?this.state.res.file_name:this.state.res.privew_image}} >
       <TouchableOpacity onPress={()=>this.clickToShow()}>{(this.state.res.file_type==3)?<View style={{backgroundColor:color.orange,width:responsiveWidth(50),borderRadius:20,justifyContent:'center',alignItems:'center',height:responsiveHeight(7)}}><Text style={{color:color.white,fontSize:responsiveFontSize(3)}}>CLICK HERE</Text></View>:<Image source={previewImage}/>}</TouchableOpacity>                 
                    
</ImageBackground>
                    
                   
                   </View>
                    </View>
                        
              
        </View>
        <Text style={{fontSize:responsiveFontSize(3),color:color.purple,fontFamily:'LakkiReddy'}}>Overview</Text>    
                  <Text style={{fontSize:responsiveFontSize(2.5),color:color.darkGray,fontFamily:'LakkiReddy',marginRight:responsiveWidth(35)}}>COURSE DESCRIPTION</Text>
       <Text style={[{marginLeft:responsiveWidth(1),fontSize:responsiveFontSize(1.8),color:color.darkGray,fontFamily:'OpenSans'}]}>{this.state.desDetails}</Text>
                    <View style={{borderBottomWidth:responsiveWidth(1),borderBottomColor:color.deepGray,width:responsiveWidth(47)}}><Text style={{fontSize:responsiveFontSize(3),color:color.deepGray,fontFamily:'LakkiReddy',marginTop:responsiveHeight(2)}}>Igborizing Fun</Text></View>
                    <FlatList contentContainerStyle={{justifyContent:'space-between',alignItems:'flex-start',marginTop:responsiveHeight(1),marginRight:responsiveWidth(2),marginLeft:responsiveWidth(2),width:responsiveWidth(90)}} data={this.state.igboData} 
                   numColumns={2}
                   renderItem={({item,index}) => 
                     <View style={{backgroundColor:color.lighter,marginRight:responsiveWidth(4),alignItems:'flex-start',justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress={()=>{(this.state.status=='expire')?this.props.navigation.navigate('Subscription'):this.props.navigation.navigate('StudyMaterials',{'study_material_id':item.study_material_id,'details':this.state.igboData,'index':index})}}>
                    
                    <View style={[{justifyContent:'flex-start',width:responsiveWidth(40)}]}>               
                    
                    <ImageBackground style={{justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(2),height:responsiveHeight(15),width:responsiveWidth(40)}} imageStyle={{resizeMode:'contain'}} source={{uri:(item.file_type==4)?item.file_name:item.privew_image}} >
                    
       <TouchableOpacity onPress={()=>(item.file_type==3)&&Linking.openURL(item.file_name)}>{(item.file_type==3)?<View style={{backgroundColor:color.orange,width:responsiveWidth(30),borderRadius:20,justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(3),height:responsiveHeight(5)}}><Text style={{color:color.white,fontSize:responsiveFontSize(2)}}>CLICK HERE</Text></View>:<Image source={previewImage}/>}</TouchableOpacity>                 
                    </ImageBackground>
      
                 {(item.is_new===1)?<View style={{width:responsiveWidth(15),height:responsiveHeight(3),marginLeft:responsiveWidth(1),justifyContent:'center',alignItems:'center',position:'absolute',marginTop:responsiveHeight(2),backgroundColor:color.blue,transform : [{rotate : '-30deg'}],}}><Text style={{color:color.white}}>NEW</Text></View>:null}
                 </View>
                    <Text style={{fontSize:responsiveFontSize(2),color:color.green,fontFamily:'LakkiReddy',marginTop:responsiveHeight(2),marginLeft:responsiveWidth(2)}}>{item.study_title}</Text>
                    <ShowMore>
                    <Text style={[{marginLeft:responsiveWidth(1),fontSize:responsiveFontSize(1.8),color:color.darkGray,marginLeft:responsiveWidth(2),fontFamily:'OpenSans',width:responsiveWidth(30)}]}>{item.study_description}</Text>
                    </ShowMore>
                   </TouchableOpacity>
                   </View>
                            }  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
                <View style={{height:responsiveHeight(10)}}></View>
        </ScrollView>
        </ImageBackground>
       
       
       
        </View>
   
      </View>
    );
  }
}
const mapStateToProps = state => ({


  ldetailsdata : state.lessonDetailsApiResponseDataConfig.ldetailsdata,
  ldetailsloading : state.lessonDetailsApiResponseDataConfig.ldetailsloading,
  ldetailsmessage : state.lessonDetailsApiResponseDataConfig.ldetailsmessage,
  ldetailsresult : state.lessonDetailsApiResponseDataConfig.ldetailsresult,
  submessage : state.lessonDetailsApiResponseDataConfig.submessage,
  subresult : state.lessonDetailsApiResponseDataConfig.subresult,
 


});

const ActionCreators = Object.assign(
  {}, 
  lessonDetailsAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(LessonDetails)
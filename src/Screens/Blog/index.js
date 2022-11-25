import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform, Linking} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as blogListingAction from './../../redux/actions/blogListingAction'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors';
import Spinner from 'react-native-loading-spinner-overlay'; 
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
 class Blog extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isReadMore:false,
       res:[],
       item:0
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
  let params = {};
  let {actions} = this.props;
 
    actions.getBlogData(params);
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
           {(loading) && <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }            
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginLeft:responsiveWidth(4)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),marginLeft:responsiveWidth(32),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1)}}>Blog</Text></ImageBackground>          
        </View>
        {/* <Text style={Styles.homeText}>Virtual Language</Text> */}
        <View style={Styles.purpleView}>
         <FlatList data={data}  
                    renderItem={({item,index}) => 
                    <View style={Styles.learningView}> 
                    <View style={{flexDirection:'row',width:responsiveWidth(90),height:responsiveHeight(6)}}>
                      <View style={Styles.dateView}>
                    <Text style={{fontSize:responsiveFontSize(4),color:color.purple,fontWeight:'bold'}}>{item.post_day}</Text>
                    <Text style={{fontSize:responsiveFontSize(1.5),color:color.blue,fontWeight:'bold'}}>{item.post_month}</Text>
                    </View>
                    <View style={Styles.blogHeaderView}>
                    <Text style={{fontSize:responsiveFontSize(2.5),color:color.darkGray,fontWeight:'700'}}>{item.blog_title}</Text>
                    <View style={Styles.newsView}>
                      <View style={Styles.adminView}>
                      <Image source={adminImage}/>
                      <Text style={[Styles.adminTextView,{marginLeft:responsiveWidth(1),marginRight:responsiveWidth(4)}]}>Admin</Text>
                      </View>
                      {/* <View style={Styles.adminView}>
                      <Image source={newsImage}/>
                      <Text style={[Styles.adminTextView,{marginLeft:responsiveWidth(1),marginRight:responsiveWidth(4)}]}>News</Text>
                      </View>
                      <View style={Styles.adminView}>
                      <Image source={commentImage}/>
                      <Text style={[Styles.adminTextView,{marginLeft:responsiveWidth(1)}]}>{item.comment_count}</Text>
                      </View> */}
                      </View>
                    </View>
                    </View>
                    
                    {(item.blog_file_type=='1') ?<ImageBackground style={{backgroundColor:color.black,marginTop:responsiveHeight(3),justifyContent:'center',alignItems:'center',height:responsiveHeight(30),width:'100%'}} imageStyle={{resizeMode:'contain'}} source={{uri:item.preview_image}} >
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('video',{'link':item.blog_image,'type':1})}><Image source={previewImage}/></TouchableOpacity>                 
                    
</ImageBackground>:
                    <Image source={{uri:item.blog_image}} style={{marginTop:responsiveHeight(3),height:responsiveHeight(30),width:responsiveWidth(90)}} resizeMode={'contain'}/>
                    }
                    {(item.blog_file_type==3)&& <TouchableOpacity  onPress={()=>Linking.openURL(item.blog_image)} style={{backgroundColor:color.orange,width:responsiveWidth(50),position:'absolute',top:responsiveHeight(15),borderRadius:20,justifyContent:'center',alignItems:'center',height:responsiveHeight(7),left:responsiveWidth(20)}}><Text style={{color:color.white,fontSize:responsiveFontSize(3)}}>CLICK HERE</Text></TouchableOpacity>
}
                    <Text style={[{marginLeft:responsiveWidth(1),marginTop:responsiveHeight(2),fontSize:responsiveFontSize(1.8),color:color.darkGray,fontWeight:'400'}]} numberOfLines={(this.state.isReadMore && index==this.state.item)?null:2}>{item.blog_description}</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('BlogComent',{'title':item.blog_title,'description':item.blog_description,'type':item.blog_file_type,'image':item.blog_image,'blogId':item.blog_id,'comment':item.blog_comments,'preview':item.preview_image})} style={{justifyContent:'flex-start',alignItems:'flex-start'}}>{(this.state.isReadMore && index==this.state.item)?null:<Text style={Styles.readMoreText}>READ MORE</Text>}</TouchableOpacity>
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
export default connect(mapStateToProps,mapDispatchToProps)(Blog)
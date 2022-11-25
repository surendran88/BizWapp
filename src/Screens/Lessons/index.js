import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as lessonListingAction from '../../redux/actions/lessonListingAction'; 
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import VideoPlayer from 'react-native-video-controls';
import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation';
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
class Lessons extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isReadMore:false,
       lesson:'',
       res:[],
       isloading:true
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
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
  const {state} = this.props.navigation;
console.log("PROPS " + state.params.lesson);
this.state.lesson=state.params.lesson
  let params = {'lesson_id':state.params.lessonId};
  let {actions} = this.props;
 
    actions.getlessonListingData(params);
}
UNSAFE_componentWillReceiveProps(){
  let {lldata,llmessage,lloading,llresult}=this.props
  if (llresult){
    
    this.setState({res:lldata})
    console.log(lldata)
    this.state.isloading=false
  }
} 
  //Design
  render() {
    let {lldata,lloading,llmessage,llresult}=this.props
    if (lldata==null){
      lldata=[]
    }
    else{
    this.state.isloading=false
    this.state.res=lldata

    }
    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
        {(this.state.isloading) && <Spinner
          visible={this.state.isloading}
          textContent={'k...'}
          textStyle={{color: color.white}}
                    />   }              
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('LessonListing',{})} style={{marginLeft:responsiveWidth(4)}}>
              <Image source={backIg}></Image>
            </TouchableOpacity>
            <Text style={{fontSize:responsiveFontSize(3),textAlign:'center',justifyContent:'flex-start',width:responsiveWidth(40),height:responsiveHeight(10),color:color.white,marginTop:responsiveHeight(1),fontFamily:'LakkiReddy',marginLeft:responsiveWidth(20)}}>{this.state.lesson} </Text>
            {/* <TouchableOpacity ><Image source={filterImage}></Image></TouchableOpacity><TouchableOpacity style={{marginRight:responsiveWidth(3.5)}}><Image source={searchImage}></Image></TouchableOpacity> */}
            </ImageBackground>          
        </View>
        {/* <Text style={Styles.homeText}>Virtual Language</Text> */}
        <View style={Styles.purpleView}>
          
         <FlatList style={{width:responsiveWidth(87)}} data={this.state.res}  
                    renderItem={({item,index}) => 
                    <View style={Styles.learningView}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('LessonDetails',{'name':item.title,'lessonId':item.lesson_id})}>
                    <Text style={{fontSize:responsiveFontSize(3),color:color.purple,fontFamily:'LakkiReddy'}}>{item.title}</Text>
                    <Text style={[{marginLeft:responsiveWidth(1),fontSize:responsiveFontSize(1.8),color:color.darkGray,fontFamily:'OpenSans'}]} numberOfLines={(this.state.isReadMore)?null:2}>{item.description}</Text>
                    {(item.uploaded_file_type=='1')?<VideoPlayer
                    style={{marginTop:responsiveHeight(3),width:responsiveWidth(90)}}
                    resizeMode="contain"
    source={(item.uploaded_file) && { uri: item.uploaded_file }}
    navigator={ this.props.navigator }/>:<Pdf
    source={{ uri: details.file_name,cache:true }}
    onLoadComplete={(numberOfPages,filePath)=>{
        console.log(`number of pages: ${numberOfPages}`);
    }}
    onPageChanged={(page,numberOfPages)=>{
        console.log(`current page: ${page}`);
    }}
    onError={(error)=>{
        console.log(error);
    }}
    onPressLink={(uri)=>{
        console.log(`Link presse: ${uri}`)
    }}
    style={Styles.pdf}/>}
                   
                      
                      </TouchableOpacity>
    
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


  lldata : state.lessonListingApiResponseDataConfig.lldata,
  lloading : state.lessonListingApiResponseDataConfig.lloading,
  llmessage : state.lessonListingApiResponseDataConfig.llmessage,
  llresult : state.lessonListingApiResponseDataConfig.llresult,
  
 


});

const ActionCreators = Object.assign(
  {}, 
  lessonListingAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(Lessons)
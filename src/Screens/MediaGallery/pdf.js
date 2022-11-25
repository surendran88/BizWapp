import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as mediaGalleryAction from '../../redux/actions/mediaGalleryAction'; 
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle';
import color from '../../components/Colors'; 
import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation';
import { Dimensions } from 'react-native';

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
const videoImage = require('../../../assets/video-img.png');

export default class pdf extends Component{  
    constructor(props) {
      super(props);
     
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isReadMore:false,
       link:'',
      type:'',
      Orientation:''
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
UNSAFE_componentWillMount(){
  Orientation.lockToPortrait()
    const {state} = this.props.navigation;
    this.state.link=state.params.link
    this.state.type=state.params.type
  
}


backToPreviousImage=()=>{
  this.props.navigation.goBack()
  // Orientation.removeOrientationListener(this._orientationDidChange);
  // Orientation.lockToPortrait()
  // Orientation.unlockAllOrientations()
  
}

componentWillUnmount() {
 
}


UNSAFE_componentWillReceiveProps(){
    const {state} = this.props.navigation;
    this.state.link=state.params.link
 
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
    let {data,loading,message,result}=this.props
    console.log('orientation',this.state.link)

      return (
        <View style={GlobalStyle.container}>
          
          <View style={Styles.subContainerVideo}>  
          {(loading) && <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{color: color.white}}
                      />   }          
          {/* <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>         */}
          <View style={Styles.pdfBgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.backToPreviousImage()} style={{marginLeft:responsiveWidth(3)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1)}}>{(this.state.type==4)?'Image':'Pdf'}</Text><TouchableOpacity style={{marginRight:responsiveWidth(5)}}></TouchableOpacity></ImageBackground>          
          </View>
       {/* <View style={{width:responsiveWidth(100),height:responsiveHeight(80)}}>    */}
       {(this.state.type=='4')?<Image source={{uri:this.state.link}} style={{width:responsiveWidth(100),height:responsiveHeight(90)}} resizeMode='contain'/>:<Pdf 
      source={{ uri:encodeURI(this.state.link),cache:true}}
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
  
          {/* <VideoPlayer                              
      source={{ uri: this.state.link }}
      navigator={ this.props.navigator }
  />  */}
         {/* </View> */}
          
          </View>
     
        </View>
      );
   
   
  }
}


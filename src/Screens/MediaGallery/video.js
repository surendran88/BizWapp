import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform,StatusBar,BackHandler} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions'; 
import Spinner from 'react-native-loading-spinner-overlay';
 
import Styles from './style'; 
import color from '../../components/Colors';
import VideoPlayer from 'react-native-video-controls';
import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation';
import { Dimensions,SafeAreaView } from 'react-native';

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
 class video extends Component{  
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
    const {state} = this.props.navigation;
    this.state.link=state.params.link
    this.state.type=state.params.type
    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
console.log(initial)    } else {
  console.log(initial)
      // do something else
    }
    if(this.state.type=='1')
    {Orientation.lockToPortrait()}
    else{Orientation.lockToLandscape()}
}

componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  StatusBar.setHidden(true);
  // this locks the view to Portrait Mode
  //Orientation.lockToPortrait();

  // this locks the view to Landscape Mode
  Orientation.lockToLandscape();
  

  // this unlocks any previous locks to all Orientations
  // Orientation.unlockAllOrientations();

  Orientation.addOrientationListener(this._orientationDidChange);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {
  Orientation.lockToPortrait()
  return false;
}

backToPreviousImage=()=>{
  Orientation.removeOrientationListener(this._orientationDidChange);
  Orientation.lockToPortrait()
  this.props.navigation.goBack()
  
  // Orientation.unlockAllOrientations()
  
}
_orientationDidChange = (orientation) => {
  if (orientation === 'LANDSCAPE') {
   
  } else {
    
  }
}
componentWillUnmount() {
  StatusBar.setHidden(false);
  Orientation.getOrientation((err, orientation) => {
    console.log(`Current Device Orientation: ${orientation}`);
  });


  // Remember to remove listener
  Orientation.removeOrientationListener(this._orientationDidChange);
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
    console.log('orientation',encodeURI(this.state.link))

      return (
        // <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{flex: 1,backgroundColor : color.black}}>
          
          <View style={Styles.subContainerVideo}>  
          {(loading) && <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{color: color.white}}
                      />   }          
          {/* <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>         */}
          <View style={Styles.bgView}>
          <ImageBackground  style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.backToPreviousImage()} style={{marginLeft:responsiveWidth(3)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1)}}></Text></ImageBackground>          
          </View>
          <VideoPlayer
             source={{ uri: encodeURI(this.state.link)}}
             navigator={ this.props.navigator }
            _onBack={()=>this.props.navigation.goBack()}
            disableBack={true}
            disableFullscreen={false}
            playsInBackground={true}
            rotateToFullScreen={true}
            resizeMode="contain"

             />
          
          </View>
     
        </View>
        // </SafeAreaView>
      );
   
   
  }
}
module.exports = video;
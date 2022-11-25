import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as mediaGalleryAction from '../../redux/actions/mediaGalleryAction'; 
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors' 
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
const videoImage = require('../../../assets/video-img.png');
const previewImage = require('../../../assets/PreviewImage.png');
class MediaGallery extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isReadMore:false,
       res:[]
      
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
  let params = {'page':''};
  let {actions} = this.props;
 
    actions.getMediaGalleryData(params);
}
UNSAFE_componentWillReceiveProps(){
  let {data,loading,message,result}=this.props
  if (result){
    this.setState({res:data})
    console.log(data)
  }
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
    console.log(data,loading,message,result)
    if (data==null){
      this.state.res=[]
    }
    else{
      this.state.res=data
    }
    return (
      <View style={GlobalStyle.container}>
        
        <View style={Styles.subContainer}>  
        {(loading) && <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }          
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.pdfBgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginLeft:responsiveWidth(4)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1),marginRight:responsiveWidth(5)}}>Media Gallery</Text><TouchableOpacity style={{marginRight:responsiveWidth(3.5)}}></TouchableOpacity></ImageBackground>          
        </View>
        {/* <Text style={Styles.homeText}>Virtual Language</Text> */}
        <View style={Styles.purpleView}>
          
         <FlatList style={{width:responsiveWidth(90),marginLeft:responsiveWidth(5)}} data={this.state.res}  
                    renderItem={({item,index}) => 
                    <TouchableOpacity style={{backgroundColor:color.white,width:responsiveWidth(80),height:responsiveHeight(20),justifyContent:'center',alignItems:'center'}} onPress={()=>(item.file_type==2)?this.props.navigation.navigate('pdf',{'link':item.gallery_video,'type':4}):this.props.navigation.navigate('video',{'link':item.gallery_video})}>
                    <View style={Styles.learningView}> 
                                        
                    <ImageBackground style={{backgroundColor:color.black,justifyContent:'center',alignItems:'center',width:responsiveWidth(90),height:responsiveHeight(20),marginTop:responsiveHeight(1)}} imageStyle={{resizeMode:'stretch'}} source={{uri:(item.file_type==2)?item.gallery_video:item.preview_image}}>
                       <TouchableOpacity onPress={()=>(item.file_type==2)?this.props.navigation.navigate('pdf',{'link':item.gallery_video,'type':4}):this.props.navigation.navigate('video',{'link':item.gallery_video,'type':item.file_type})}><Image source={previewImage}/></TouchableOpacity>                 
                    
</ImageBackground>               

                    </View>    
                    </TouchableOpacity>                        
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


  data : state.mediaGalleryApiResponseDataConfig.data,
  loading : state.mediaGalleryApiResponseDataConfig.loading,
  message : state.mediaGalleryApiResponseDataConfig.message,
  result : state.mediaGalleryApiResponseDataConfig.result,
  
 


});

const ActionCreators = Object.assign(
  {}, 
  mediaGalleryAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(MediaGallery)
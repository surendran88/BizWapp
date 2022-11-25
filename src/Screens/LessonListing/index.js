import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Linking} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as lessonListingCategoryAction from '../../redux/actions/lessonListingCategoryAction'; 
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors' 
import { ScrollView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation';
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
const backgroundIg = require('../../../assets/home-bg.png');
const headerImage = require('../../../assets/top-bar.png');
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
const expertImage = require('../../../assets/block-expert.png');
const igboImage = require('../../../assets/block-igbo.png');
const intermediateImage = require('../../../assets/block-intermediate.png');
const backImage = require('../../../assets/btn-back.png');
const searchImage = require('../../../assets/icon-search.png');
const filterImage = require('../../../assets/icon-filter.png');
const writeImage = require('../../../assets/icon-write.png');
var ListingData=[];
const imageArray=[{'image':lesson1Image},{'image':lesson2Image},{'image':lesson3Image},{'image':lesson4Image},{'image':lesson5Image},{'image':lesson6Image},{'image':lesson7Image},{'image':lesson8Image},{'image':lesson9Image},{'image':lesson10Image}]
 class LessonListing extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       rememberMe:false,
       isModalVisible:false,
       isloading:true,
       cat:'',
       description:''
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
console.log("PROPS " + state.params.sectionId);
this.setState({description:state.params.description})
if (state.params.type=='lesson'){
  if(state.params.sectionId==4){
    let params = {'standard_id':4,'section_id':0,'category_id':2};
    let {actions} = this.props;
   
      actions.getIgboLessonCategoryData(params);
    
  }
  else{
  this.getlisting(state.params.sectionId)
}
 
}
else if (state.params.type=='cat'){
  this.setState({cat:'cat'})
  let params = {'category_id':state.params.sectionId};
    let {actions} = this.props;
    actions.getigboLessonCategoryByUserId(params)
 
}
else{
    let params = {'standard_id':state.params.standardId,'section_id':state.params.sectionId+1};
    console.log('standard_idd',state.params.standardId,'SectionIdd',state.params.sectionId+1)
    let {actions} = this.props;
     actions.getLessonCategoryData(params);
}
  }
  getlisting=async(standardId)=>{
    let params = {'standard_id':standardId,'section_id':0};
    let {actions} = this.props;
   
      actions.getLessonCategoryData(params);
  }
  UNSAFE_componentWillReceiveProps(){
    let {lessonCatData,lcloading,lcmessage,lcresult}=this.props
    if (lcresult){
      if (lessonCatData != null)
      if (lessonCatData.length>imageArray.length){
        this.setState({isloading:false})
        for (i=imageArray.length;i>(lessonCatData.length-imageArray.length);i++){
        imageArray.push(imageArray[i].image)
        }
      }
      this.setState({res:lessonCatData})
      console.log(lessonCatData)
    }
  } 

clickOnCategories=()=>{
  this.setState({isModalVisible:false})

}
getIgboWord=(name)=>{
  

const [igbo,english ]= name.split('[');
return igbo
}
getEnglishWord=(name)=>{
  

  const [igbo,english ]= name.split('[');
  if (english==null)
  return ''
  else
  return english
  }
  //Design
  render() {
    let {lessonCatData,lcloading,lcmessage,lcresult}=this.props
    if (lessonCatData==null){
      lessonCatData=[]
    }
    
    else {
      if (lessonCatData.length>0){
      ListingData=lessonCatData
      this.state.isloading=false
      }
      if(lcloading && lessonCatData.length==0 ){
      this.state.isloading=false
      ListingData=lessonCatData
      }
    }
    return (
      <View style={[GlobalStyle.container]}>
        
        <View style={Styles.subContainer}>  
        {(this.state.isloading) && <Spinner
          visible={this.state.isloading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }     
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}> 
              
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'flex-start'}}>
            
            <View style={{width:responsiveWidth(60),height:responsiveHeight(10),flexDirection:'row',marginTop:responsiveHeight(2),justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home',{})} style={{marginLeft:responsiveWidth(4)}}><Image source={backImage}></Image></TouchableOpacity>
            <Text style={{fontSize:responsiveFontSize(3),marginLeft:responsiveWidth(12),color:color.white,fontFamily:'LakkiReddy'}}>Module</Text>
            </View>
            </ImageBackground>          
        </View>
        <ScrollView contentContainerStyle={{justifyContent:'center',alignItems:'center'}}> 
        <View style={{height:responsiveHeight(10),marginTop:responsiveHeight(5),backgroundColor:color.purple,width:responsiveWidth(30),justifyContent:'center',borderTopRightRadius:30,borderBottomLeftRadius:30,alignItems:'center'}}>
        <Text style={{fontSize:responsiveFontSize(3),color:color.white,fontFamily:'LakkiReddy'}}>Igbo</Text>
          </View>
        <View style={Styles.purpleView}>
         <FlatList contentContainerStyle={{justifyContent:'center',alignItems:'center',width:responsiveWidth(100)}} data={ListingData}  
                    numColumns={2}
                    renderItem={({item,index}) =>                    
                    <View style={[Styles.learningView]}> 
                     <ImageBackground source={imageArray[index].image} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}} imageStyle={{resizeMode:'contain'}}>
                        <TouchableOpacity onPress={()=>(this.state.cat=='cat')?Linking.openURL(item.file_name):this.props.navigation.navigate('LessonDetails',{'lesson':item.lesson_name,'lessonId':item.lesson_id,'description':this.state.description})} style={{justifyContent:'center',alignItems:'center',height:responsiveHeight(10)}}><Text style={[Styles.listinView,{textAlign:'center',marginLeft:responsiveWidth(2),marginRight:responsiveWidth(2)}]}>{this.getIgboWord(item.lesson_name)}</Text><Text style={[Styles.listinView,{textAlign:'center',marginLeft:responsiveWidth(2),marginRight:responsiveWidth(2)}]}>{(this.getEnglishWord(item.lesson_name)=='')?'':'['+this.getEnglishWord(item.lesson_name)}</Text></TouchableOpacity>  
                     </ImageBackground>
                    </View>} 
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
        </View>
        </ScrollView>
        </ImageBackground>
       
        
        </View>
        {/* <View style={GlobalStyle.bottomTextView}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUp')}}><Text style={[Styles.signUpButtonText,{color:color.darkGray,}]}>Don't have an Account? <Text style={[Styles.signUpButtonText,{fontWeight:'bold',color:color.purple}]}>SIGN UP</Text></Text></TouchableOpacity>
        </View> */}
      </View>
    );
  }
}
const mapStateToProps = state => ({


  lessonCatData : state.lessonCategoryListingApiResponseDataConfig.lessonCatData,
  lcloading : state.lessonCategoryListingApiResponseDataConfig.lcloading,
  lcmessage : state.lessonCategoryListingApiResponseDataConfig.lcmessage,
  lcresult : state.lessonCategoryListingApiResponseDataConfig.lcresult,
  
 


});

const ActionCreators = Object.assign(
  {}, 
  lessonListingCategoryAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(LessonListing)
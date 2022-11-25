import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Linking,Alert} from 'react-native';
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
import moment from "moment";
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
 class LearningProgress extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       rememberMe:false,
       isModalVisible:false,
       isloading:true,
       cat:'',
       description:'',
       course_details:[]
     }
    }
    renderSeparator = () => {  
      return (  
          <View  
              style={{  
                  height: responsiveHeight(2),  
                  width: "100%",  
                  // backgroundColor: color.purple,  
              }}  
          />  
      );  
  };  
  UNSAFE_componentWillMount(){
    Orientation.lockToPortrait()
    const {state} = this.props.navigation;
    console.log("PROPS " + state.params.details);
    this.state.course_details=state.params.details
// Alert.alert('Biawazo','No data Found')
if(this.state.course_details.length==0){
  Alert.alert('Biawazo','No data Found')
}
 
}
  
  
 

  //Design
  render() {
    
    return (
      <View style={[GlobalStyle.container]}>
        
        <View style={Styles.subContainer}>  
         
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}> 
              
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'flex-start'}}>
            
            <View style={{width:responsiveWidth(60),height:responsiveHeight(10),flexDirection:'row',marginTop:responsiveHeight(2),justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile',{})} style={{marginLeft:responsiveWidth(4)}}><Image source={backImage}></Image></TouchableOpacity>
            <Text style={{fontSize:responsiveFontSize(3),marginLeft:responsiveWidth(10),color:color.white,fontFamily:'LakkiReddy'}}>Courses Following</Text>
            </View>
            </ImageBackground>          
        </View>
        {/* <ScrollView contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>  */}
       
        <View style={Styles.purpleView}>
         <FlatList contentContainerStyle={{justifyContent:'flex-start',alignItems:'center',width:responsiveWidth(100)}} data={this.state.course_details}  
                    // numColumns={2}
                    initialNumToRender={10}
                    renderItem={({item,index}) =>                    
                    <View style={[Styles.learningView]}> 
                   <View style={{justifyContent:'flex-start',alignItems:'flex-start',width:responsiveWidth(50)}}>
    <Text style={{fontFamily:'LakkiReddy',color:color.black,fontSize:responsiveFontSize(2)}}>{item.lesson_name}</Text>
    <Text style={{color:color.purple,fontFamily:'LakkiReddy'}}>{item.section_name}</Text>
                     </View>
                     <View style={{justifyContent:'flex-end',alignItems:'center',width:responsiveWidth(40)}}>
    <Text style={{marginLeft:responsiveWidth(5),}}>{moment(item.lesson_completed_at).format("MM/DD/YYYY")}</Text>
    <View style={{borderRadius:10,marginTop:responsiveHeight(1),height:responsiveHeight(3),marginLeft:responsiveWidth(5),borderWidth:responsiveHeight(0.05),borderColor:color.green,justifyContent:'center',alignItems:'center'}}><Text style={{color:color.green,fontFamily:'LakkiReddy',textAlign:'center',marginTop:responsiveHeight(0.5)}}>  COMPLETED  </Text></View>
                     </View>
                    </View>} 
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
                <View style={{height:responsiveHeight(5)}}></View>
        </View>
        {/* </ScrollView> */}
        </ImageBackground>
        </View>
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
export default connect(mapStateToProps,mapDispatchToProps)(LearningProgress)
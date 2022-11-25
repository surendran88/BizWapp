import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Linking} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as faqAction from '../../redux/actions/faqAction'; 
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors' ;
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
const plusImage = require('../../../assets/Plus.png');
const minusImage = require('../../../assets/minus.png');
const intermediateImage = require('../../../assets/block-intermediate.png');
const backImage = require('../../../assets/btn-back.png');
const searchImage = require('../../../assets/icon-search.png');
const filterImage = require('../../../assets/icon-filter.png');
const writeImage = require('../../../assets/icon-write.png');
var ListingData=[];
const imageArray=[{'image':lesson1Image},{'image':lesson2Image},{'image':lesson3Image},{'image':lesson4Image},{'image':lesson5Image},{'image':lesson6Image},{'image':lesson7Image},{'image':lesson8Image},{'image':lesson9Image},{'image':lesson10Image}]
 class Faq extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       rememberMe:false,
       isModalVisible:false,
       isloading:true,
       cat:'',
       res:[],
       number:0,
       faqClick:false
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

    
    let {actions} = this.props;
   
      actions.getFaqList('');

  }
  UNSAFE_componentWillReceiveProps(){
    let {faqData,floading,fmessage,fresult}=this.props
    if (fresult){
      this.setState({res:faqData})
      }
     
      console.log(faqData)
    
  } 

clickOnFaq=(ind)=>{
  if (ind==this.state.number){
  (this.state.faqClick) ? this.setState({faqClick:false}):this.setState({faqClick:true})
  console.log('hello', this.state.faqClick,this.state.number)
}
  this.setState({number:ind})
console.log(this.state.faqClick,this.state.number)
}
  //Design
  render() {
    let {faqData,floading,fmessage,fresult}=this.props
  
    return (
      <View style={[GlobalStyle.container]}>
        
        <View style={Styles.subContainer}>  
        {/* {(this.state.isloading) && <Spinner
          visible={this.state.isloading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   }      */}
        <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{resizeMode:'stretch'}}>        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'flex-start'}}>
            <View style={{width:responsiveWidth(60),height:responsiveHeight(10),flexDirection:'row',marginTop:responsiveHeight(1),justifyContent:'space-between',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home',{})} style={{marginLeft:responsiveWidth(4)}}><Image source={backImage}></Image></TouchableOpacity>
            <Text style={{fontSize:responsiveFontSize(3),color:color.white,marginRight:responsiveWidth(5),fontFamily:'LakkiReddy'}}>FAQ</Text>
            </View>
            </ImageBackground>          
        </View>
       
        <View style={Styles.purpleView}>
         <FlatList contentContainerStyle={{justifyContent:'flex-start',alignItems:'center',width:responsiveWidth(100)}} data={faqData}  
                   
                    renderItem={({item,index}) =>  
                    <View style={{justifyContent:'flex-start',alignItems:'center'}}>                  
                    <View style={[Styles.learningView,{backgroundColor:'#A6C437',flexDirection:'row',marginTop:responsiveHeight(1),borderRadius:15,}]}> 
                     
                        <TouchableOpacity onPress={()=>this.clickOnFaq(index)}><Text style={[Styles.listinView,{textAlign:'center', color:color.white,marginTop:responsiveHeight(2),marginBottom:responsiveHeight(2)}]}>{item.question}</Text></TouchableOpacity> 
                        <TouchableOpacity onPress={()=>this.clickOnFaq(index)} style={{marginTop:responsiveHeight(2),marginRight:responsiveWidth(5)}}><Image source={(this.state.faqClick && this.state.number==index)?minusImage:plusImage} /></TouchableOpacity> 
                     
                    </View>
                    {(this.state.faqClick && this.state.number==index)?<View style={[Styles.learningView,{backgroundColor:color.lighter,width:responsiveWidth(85)}]}> 
                     
                    <TouchableOpacity ><Text style={[Styles.listinView,{textAlign:'center', color:color.deepGray,marginTop:responsiveHeight(2),marginBottom:responsiveHeight(2)}]}>{item.answer}</Text></TouchableOpacity>  
                 
                </View>:null}
                </View>
                    } 
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
        </View>
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


  faqData : state.faqApiResponseDataConfig.faqData,
  floading : state.faqApiResponseDataConfig.floading,
  fmessage : state.faqApiResponseDataConfig.fmessage,
  fresult : state.faqApiResponseDataConfig.fresult,
});

const ActionCreators = Object.assign(
  {}, 
  faqAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(Faq)
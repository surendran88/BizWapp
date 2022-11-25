import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {Text, View,Image,ImageBackground,TouchableOpacity,TextInput,FlatList,Platform} from 'react-native';
import {responsiveWidth, responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
import * as aboutUsAction from './../../redux/actions/aboutUsAction'; 
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import { thisTypeAnnotation } from '@babel/types';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import HTML from 'react-native-htmlview';
import Orientation from 'react-native-orientation';
import * as signupActions from './../../redux/actions/signupActions'
// const backgroundBlackIg = require('../../assets/bg2.png');
// const LakkiReddy = require('../../../assets/Fonts/LakkiReddy-Regular.ttf')
const backgroundIg = require('../../../assets/home-bg.png');
const backIg = require('../../../assets/btn-back.png');
const headerImage = require('../../../assets/top-bar.png');
const backGroundGreenImage = require('../../../assets/about-green-bg.png');
const aboutImage = require('../../../assets/about-image.jpg');
const aboutBlockImage = require('../../../assets/about-prof-block.png');

const profileImage = require('../../../assets/profile-img.png');
const yearlyImage = require('../../../assets/yearly-block.png');
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
 class AboutUs extends React.PureComponent{  
    constructor(props) {
      super(props);
     this.state={
       isSideBarVisible:false,
       isModalVisible:false,
       isSubscribe:true,
       category:'monthly',
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
  this.clickOnSubscription(true,'monthly')
  let params = {};
  let {actions} = this.props;
 
    actions.getAboutUsData(params);
   
    //alert(JSON.stringify(responseData));
    actions.getsubscriptionListingData('');
}
clickOnSubscription=(status,cat)=>{
  
  if (status==true && cat == this.state.category){
  this.setState({isSubscribe:false})
  }
  else{
  this.setState({isSubscribe:true})
  }
  this.setState({category:cat})
}
navigateFromSideMenu=(page)=>{
  this.setState({isSideBarVisible:false})
  this.props.navigation.navigate(page)
}
UNSAFE_componentWillReceiveProps(){
  let {aboutUsdata,loading,message,result,subscriptionDetails,subsmessage,subresult}=this.props
  if (result){
    this.setState({res:aboutUsdata})
    console.log(aboutUsdata,subscriptionDetails,subsmessage,subresult)
  }
}
  //Design
  render() {
    let{aboutUsdata,loading,message,result,subscriptionDetails,subsmessage,subresult}=this.props
    if(aboutUsdata==null){
      aboutUsdata=[]
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
        
        <View style={Styles.bgView}>
          <ImageBackground source={headerImage} style={{width:'100%',height:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}><TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginLeft:responsiveWidth(4)}}><Image source={backIg}></Image></TouchableOpacity><Text style={{fontSize:responsiveFontSize(3),marginRight:responsiveWidth(45),color:color.white,fontFamily:'LakkiReddy',marginTop:responsiveHeight(1)}}>About</Text></ImageBackground>          
        
        </View>
        <ScrollView contentContainerStyle={{justifyContent:'flex-start',alignItems:'center',width:responsiveWidth(100)}} nestedScrollEnabled={true}>
        <View style={Styles.purpleView}>        
        <Text style={{fontSize:responsiveFontSize(3.8),color:color.purple,fontFamily:'LakkiReddy',textAlign:'center'}}>{aboutUsdata.title}</Text>
        <Image source={aboutImage} style={{resizeMode:'contain',width:'100%'}}/>
        {/* <Text style={[{marginTop:responsiveHeight(2),fontSize:responsiveFontSize(1.8),textAlign:'left',marginRight:responsiveHeight(1),marginLeft:responsiveHeight(1),color:color.darkGray,fontFamily:'OpenSans'}]}>{JSON.parse(data.content.replace(/(<([^>]+)>)/ig, ''))}</Text> */}
        <HTML style={[{marginTop:responsiveHeight(2),fontSize:responsiveFontSize(1.8),textAlign:'left',marginRight:responsiveHeight(1),marginLeft:responsiveHeight(1),color:color.darkGray,fontFamily:'OpenSans'}]} value={aboutUsdata.content} imagesMaxWidth={responsiveWidth(100)} />
        </View>
        <ImageBackground source={backGroundGreenImage} style={[Styles.greenImageBackground,{marginBottom:responsiveHeight(10)}]} imageStyle={{resizeMode:'stretch'}}>
        <ScrollView horizontal={true}>
        {/* [{key: 'Save a whooping $2/month with this annual, pay at once, offer for your language of choice. This is truly a great deal especially for learning native language. What are you waiting for?',image:require('../../../assets/monthly.png')},
                          {key: 'Ok, you are saving $4/month here! This is the best deal ever for a robust indigenous language learning program. We are focused on providing long-term value in the form of fully speaking and engaging in a native language and want you to reward those in it for the long-term too. Do NOT sleep on this',image:require('../../../assets/annual.png')}, 
                          {key: 'Join us for this all time LOW investment of $10/month to access all learning resources associated with your language of choice! Your kids, and even you, would love our interactive learning FUN! Sign up now please',image:require('../../../assets/bi-annual.png')} 
                    ] */}
        <FlatList  data={subscriptionDetails} 
                    // horizontal={true} 
                    numColumns={3}
                    renderItem={({item,index}) => 
                    <View>
                    <View style={[Styles.bottomView,{marginRight:responsiveWidth(10),marginLeft:responsiveWidth(10)}]}>
                    <ImageBackground source={aboutBlockImage} style={Styles.greenImageBackground} imageStyle={{resizeMode:'contain'}}>
                  <Text style={[{marginTop:Platform.OS==='android'?responsiveHeight(10):responsiveHeight(12), marginLeft:responsiveWidth(3), marginRight:responsiveWidth(3),textAlign:'center',fontSize:responsiveFontSize(1.5),color:color.darkGray,fontFamily:'OpenSans'}]}>{(index==0)&&'Join us for this all time LOW investment of $10/month to access all learning resources associated with your language of choice! Your kids, and even you, would love our interactive learning FUN! Sign up now please' ||(index==1)&&'Save a whooping $2/month with this annual, pay at once, offer for your language of choice. This is truly a great deal especially for learning native language. What are you waiting for?'||(index==2) &&'Ok, you are saving $4/month here! This is the best deal ever for a robust indigenous language learning program. We are focused on providing long-term value in the form of fully speaking and engaging in a native language and want you to reward those in it for the long-term too. Do NOT sleep on this'}</Text>
                    </ImageBackground>
                    <Image source={(index==0)&&  require('../../../assets/monthly.png')||(index==1)&& require('../../../assets/annual.png')||(index==2) &&require('../../../assets/bi-annual.png')} resizeMode={'cover'} style={{ position: 'absolute',height:100,width:100,borderRadius:50,top:responsiveHeight(24)}}/>
                    
                    </View>
                    <Text style={[{ textAlign:'center',fontSize:responsiveFontSize(2.5),height:responsiveHeight(5),color:color.white,fontFamily:'LakkiReddy'}]}>{(index==0)&& 'Monthly Subscription'||(index==1)&& 'Annual Subscription'||(index==2)&& '2-year Subscription'}</Text>     
                    <Text style={[{ textAlign:'center',fontSize:responsiveFontSize(2.5),height:responsiveHeight(5),color:color.white,fontFamily:'LakkiReddy'}]}>{(index==0)&& '$'+item.price+'/month'||(index==1)&&'$'+item.price+'/year'||(index==2)&& '$'+item.price+'/per 2-year'}</Text> 
                         </View>
                            }  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
       </ScrollView>
          
        </ImageBackground>
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


  aboutUsdata : state.aboutUsApiResponseDataConfig.aboutUsdata,
  loading : state.aboutUsApiResponseDataConfig.loading,
  message : state.aboutUsApiResponseDataConfig.message,
  result : state.aboutUsApiResponseDataConfig.result,
  
  subscriptionDetails:state.signupReducerConfig.subscriptionDetails,
  subresult:state.signupReducerConfig.subresult,
  subsmessage:state.signupReducerConfig.subsmessage,
 


});

const ActionCreators = Object.assign(
  {}, 
  aboutUsAction,
  signupActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps,mapDispatchToProps)(AboutUs)
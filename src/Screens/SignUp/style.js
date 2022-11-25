import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import color from '../../components/Colors'
const styles = StyleSheet.create({
  
Searchimage:{
    // position:"absolute",
    // top:responsiveHeight(3),
},
emailimage:{
    
    marginLeft:responsiveWidth(4)
},
lockimage:{
   
    marginLeft:responsiveWidth(4)
},
SignInText:{
  marginTop:responsiveHeight(12),
  fontSize:responsiveFontSize(5),
  color:'#4E97F5'
},
forgotText:{
  marginTop:responsiveHeight(12),
  fontSize:responsiveFontSize(3),
  color:'#4E97F5'
},
emailTextInput:{
    paddingTop: 0,
    paddingBottom: 0,
  fontSize:responsiveFontSize(2),
  marginLeft:responsiveWidth(3),   
    
},

RememberView:{
    height:responsiveHeight(6),
    width:responsiveWidth(80),
    justifyContent:'center',    
    flexDirection:'row'
},
RememberMeTextView:{
    fontSize:responsiveFontSize(2),
    color:color.white,
    marginLeft:responsiveWidth(4)
},

loginButtonText:{
    fontSize:responsiveFontSize(1.5),
    fontWeight:'bold',
    color:color.white,
    marginTop:responsiveHeight(0.5),
    marginLeft:responsiveWidth(1.5)

},
forgotButtonText:{
    marginTop:responsiveHeight(5),
    fontSize:responsiveFontSize(2),
    fontWeight:'600',
    color:color.white,

},
imageBackground:{
    width: '100%', 
    // height: responsiveHeight(100),
    alignItems:'center',
    justifyContent:'flex-start',
    overflow:'visible'
   
},
signUpButtonText:{
    //marginTop:Dimensions.get('screen').height/2,
    fontSize:responsiveFontSize(2),
    // fontWeight:'600',
   

},
commonTextInput:{
    paddingTop: 0,
    paddingBottom: 0,
    fontSize:responsiveFontSize(2),
    marginLeft:responsiveWidth(3),
    height:responsiveHeight(7),
    width:responsiveWidth(35),
    
},
bottomTextView:{
    justifyContent:'center',
    height:responsiveHeight(15),
    width:responsiveWidth(100),    
    alignItems:'center'
},
textFieldView:{
    height:Platform.OS==='ios'?responsiveHeight(6):responsiveHeight(7),
    width:responsiveWidth(85),
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    // marginLeft:responsiveWidth(15),
//    backgroundColor:'red'
},
textFldView:{
    height:Platform.OS==='ios'?responsiveHeight(5):responsiveHeight(6),
    width:responsiveWidth(85),
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:responsiveWidth(2),
    // backgroundColor:'#ffffff',
    // borderWidth:1,
    flexDirection:'row'
  },
  commonButton:{
    backgroundColor:color.green,
    height:Platform.OS==='ios'? responsiveHeight(5):responsiveHeight(6),
    width:responsiveWidth(70),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:responsiveWidth(2),      
  
  },
purpleView:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.purple,
    borderRadius:50,
    width:responsiveWidth(90),
    // height:responsiveHeight(90),
    marginTop:responsiveHeight(2),
    paddingBottom:responsiveHeight(5),
    // position:'absolute'
},
commontextFieldView:{
    height:Platform.OS==='ios'?responsiveHeight(5):responsiveHeight(6),
    width:responsiveWidth(85),
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:responsiveWidth(6),
    backgroundColor:'#ffffff',
    // borderWidth:1,
    flexDirection:'row'
},
});
  export default styles;
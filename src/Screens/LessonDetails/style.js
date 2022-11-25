import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import color from '../../components/Colors'
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor : color.white,       
    marginTop:Platform.OS==='ios' ? responsiveHeight(4.2) :null
  },
  takeButton:{
  height:Platform.OS==='ios'?responsiveHeight(5):responsiveHeight(6),
  width:responsiveWidth(50),
  justifyContent:'center',
  alignItems:'center',
  borderRadius:responsiveWidth(6),
  backgroundColor:color.takeOrange,
 

  },
adminView:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  width:responsiveWidth(90)
},
freeTakeView:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  width:responsiveWidth(90),
  
},
VideoView:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  width:responsiveWidth(90),
  height:responsiveHeight(40),
  marginTop:responsiveHeight(5),
  // backgroundColor:'black'
  
},
pdf: {
  
  width:responsiveWidth(90),
  height:responsiveHeight(40)
},
newsView:{
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'flex-start',
  width:responsiveWidth(55),
  marginTop:responsiveHeight(1)
},
blogHeaderView:{
  justifyContent:'center',
  alignItems:'center',
  marginLeft:responsiveWidth(5),
  height:responsiveHeight(5)
},
dateView:{
  justifyContent:'center',
  alignItems:'center',
  height:responsiveHeight(5)
},
adminTextView:{
  fontSize:responsiveFontSize(2),
  color:color.lightgray,
  fontFamily:'OpenSans'
},
readMoreText:{
  marginLeft:responsiveWidth(1),
  marginRight:responsiveWidth(4),
  marginTop:responsiveHeight(2),
  color:color.green,
  fontWeight:'bold',
  fontSize:responsiveFontSize(2)
},
bgView:{
  height:responsiveHeight(10),
  width:responsiveWidth(100),
  justifyContent:'center',
  alignItems:'center',
  // flexDirection:'row'
},
imageBackground:{
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'flex-start',
   
},


  learningView:{
    justifyContent:'flex-start',
    alignItems:'center',
    width:responsiveWidth(80),
   }, 

purpleView:{
    justifyContent:'flex-start',
    alignItems:'center',
    // backgroundColor:color.purple,
    borderRadius:50,
    width:responsiveWidth(90),
    // height:responsiveHeight(100),
    marginTop:responsiveHeight(1)
}
});
  export default styles;
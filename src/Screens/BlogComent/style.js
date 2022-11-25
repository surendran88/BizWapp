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

adminView:{
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'flex-start',
  
  marginLeft:responsiveWidth(5)
},
descriptionText:{
  marginLeft:responsiveWidth(5),
  fontSize:responsiveFontSize(1.8),
  color:color.darkGray,
  fontFamily:'OpenSans',
  marginLeft:responsiveWidth(5),
  marginRight:responsiveWidth(2)
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
  alignItems:'flex-start',
  marginLeft:responsiveWidth(5),
  height:responsiveHeight(6)
},
dateView:{
  justifyContent:'center',
  alignItems:'center',
  height:responsiveHeight(6)
},
adminTextView:{
  fontSize:responsiveFontSize(1.5),
  color:color.lightgray,
  fontWeight:'700',
  
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
  justifyContent:'flex-start',
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
    justifyContent:'space-between',
    alignItems:'flex-start',
    width:responsiveWidth(90),
   }, 

purpleView:{
    justifyContent:'flex-start',
    alignItems:'center',
    // backgroundColor:color.purple,
    borderRadius:50,
    width:responsiveWidth(90),
    height:responsiveHeight(80),
    marginTop:responsiveHeight(3)
}
});
  export default styles;
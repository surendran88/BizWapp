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
  subContainerVideo: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor : color.black,       
    marginTop:Platform.OS==='ios' ? responsiveHeight(4.2) :null
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
},
adminView:{
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center'
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
  fontSize:responsiveFontSize(1.5),
  color:color.lightgray,
  fontWeight:'700'
},
readMoreText:{
  marginLeft:responsiveWidth(1),
  marginRight:responsiveWidth(4),
  marginTop:responsiveHeight(2),
  color:color.green,
  fontWeight:'bold',
  fontSize:responsiveFontSize(2)
},
// video: {
//   width: Dimensions.get('window').width,
//   height: Dimensions.get('window').width * (9 / 16),
//   backgroundColor: 'black',
// },
bgView:{
  // height:responsiveHeight(10),
  width:responsiveWidth(100),
  justifyContent:'flex-end',
  alignItems:'flex-start',
  flexDirection:'row',
  alignSelf:'stretch'
  // backgroundColor:'red'
},
pdfBgView:{
  height:responsiveHeight(10),
  width:responsiveWidth(100),
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row'
},
imageBackground:{
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'flex-start',
   
},


  learningView:{
    justifyContent:'center',
    alignItems:'center',
    width:responsiveWidth(90),
    height:responsiveHeight(20)
   }, 

purpleView:{
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:color.purple,
    borderRadius:50,
    width:responsiveWidth(100),
    height:responsiveHeight(80),
    marginTop:responsiveHeight(2)
}
});
  export default styles;
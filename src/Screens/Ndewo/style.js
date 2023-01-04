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

 
bgView:{
  height:responsiveHeight(10),
  width:responsiveWidth(100),
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row'
},
headertitle:{
  marginTop:responsiveHeight(2),
  fontSize:responsiveFontSize(2.4),
  fontFamily:'LakkiReddy'
},
paragraph: {
  margin:responsiveHeight(0.5), 
  fontSize:responsiveFontSize(1.7),
  textAlign: 'left',
},
homeText:{
  marginTop:responsiveHeight(2),
  fontSize:responsiveFontSize(3.6),
  color:color.white,
  fontFamily:'LakkiReddy'
},
 
 
 
 
imageBackground:{
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'flex-start',
   
},
 
 
purpleView:{
    justifyContent:'flex-start',
    alignItems:'center',
    // backgroundColor:color.purple,
    borderRadius:50,
    width:responsiveWidth(90),
    // height:responsiveHeight(70),
    marginTop:responsiveHeight(1)
},
bottomView:{
  justifyContent:'flex-start',
  alignItems:'center',
  //  backgroundColor:color.purple,
  borderRadius:50,
  width:responsiveWidth(80),
  height:responsiveHeight(40),
  marginTop:responsiveHeight(3),
 
  
  
},
item: {
  backgroundColor: 'white',
  flex: 1,
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 17
},
emptyDate: {
  height: 15,
  flex: 1,
  paddingTop: 30
},
day: {
  width: 63,
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: 32
},
});
  export default styles;

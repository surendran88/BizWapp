import {Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import color from '../../components/Colors'
const styles = StyleSheet.create({
  
Searchimage:{
    // marginTop:responsiveHeight(2),
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
modalContainer:{
    backgroundColor:color.blue,
    borderRadius:20,
    padding:responsiveWidth(4)
  },
  modalHead:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    display:'flex',
  },
  modalHeading:{
    fontWeight:'bold',
    textAlign:'center',
    fontSize:responsiveFontSize(2.5),
    paddingLeft : Platform.OS === 'ios'? responsiveWidth(6) :  responsiveWidth(0),
    fontFamily:'OpenSans-Italic',
    color:color.white
  },
  modalCross:{
    flex:0,
    left:Platform.OS === 'ios'?responsiveWidth(12) :  responsiveWidth(15)
  },
  modalInput:{
    borderBottomWidth:responsiveHeight(0.2),
    borderBottomColor:color.white,
    margin: Platform.OS === 'ios'?responsiveHeight(0.6):  responsiveHeight(0.4),
    fontSize:responsiveFontSize(2),
    width: Platform.OS === 'ios'?responsiveWidth(78): responsiveWidth(80),
    fontWeight:'400',
    marginTop: Platform.OS === 'ios'?responsiveHeight(5)  : responsiveHeight(3),
    marginBottom: Platform.OS === 'ios'?responsiveHeight(5) : responsiveHeight(5),
    paddingLeft : Platform.OS === 'ios'? responsiveWidth(2) : responsiveWidth(0),
    paddingBottom :  Platform.OS === 'ios'? responsiveWidth(1) : responsiveWidth(0),
    color:color.white
    },
    modalButton:{
      alignSelf:'center',
      height:responsiveWidth(12) , 
      backgroundColor:color.white,
      borderRadius:responsiveWidth(15),
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginBottom:responsiveWidth(3),
      marginTop:responsiveWidth(2),
      width:responsiveWidth(35)
  },
  modalSendImg:{
    flex:0,
    backgroundColor:'#808080'
  },
  modalSendText:{
    color:color.green,
    fontWeight:'bold',
    fontSize:responsiveFontSize(2.2)
  },
loginButtonText:{
    fontSize:responsiveFontSize(2),
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
    height: responsiveHeight(100),
    alignItems:'center',
    justifyContent:'flex-start',
    overflow:'visible'
   
},
signUpButtonText:{
    //marginTop:Dimensions.get('screen').height/2,
    fontSize:responsiveFontSize(2),
    // fontWeight:'600',
   

},
bottomTextView:{
    justifyContent:'center',
    height:responsiveHeight(15),
    width:responsiveWidth(100),    
    alignItems:'center'
},
commontextFieldView:{
    height:Platform.OS==='ios'?responsiveHeight(6):responsiveHeight(7),
    width:responsiveWidth(90),
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
},
purpleView:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.purple,
    borderRadius:50,
    width:responsiveWidth(95),
    // height:responsiveHeight(65),
    marginTop:responsiveHeight(3),
    paddingBottom:responsiveHeight(5),
    
}
});
  export default styles;
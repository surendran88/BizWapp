import {StyleSheet, Platform, StatusBar,Dimensions} from 'react-native'
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import color from '../src/components/Colors'
// import { platform } from 'os';
const styles = StyleSheet.create ({

    container: {
        flex: 1,
        backgroundColor : color.white,
        // backgroundColor : 'red',
       

      },
      subContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor : color.white, 
        marginTop:Platform.OS==='ios' ? responsiveHeight(4.5) :null ,   
     height:responsiveHeight(100),
     width:responsiveWidth(100)
      },
      commonTextInput:{
        paddingTop: 0,
        paddingBottom: 0,
       /* fontSize:responsiveFontSize(1.5),*/
        marginLeft:responsiveWidth(3),
        height:responsiveHeight(7),
        width:responsiveWidth(60),
        
    },
    commonButton:{
      backgroundColor:color.green,
      height:Platform.OS==='ios'? responsiveHeight(6):responsiveHeight(7),
      width:responsiveWidth(70),
      justifyContent:'center',
      alignItems:'center',
      borderRadius:responsiveWidth(6),      
    
  },
  
  commontextFieldView:{
    height:Platform.OS==='ios'?responsiveHeight(6):responsiveHeight(7),
    width:responsiveWidth(75),
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius:responsiveWidth(6),
    backgroundColor:'#ffffff',
    // borderWidth:1,
    flexDirection:'row'
},
bottomTextView:{
  justifyContent:'center',
  height:responsiveHeight(15),
  width:responsiveWidth(100),    
  alignItems:'center',
  // backgroundColor:'red'
},
});

export default styles;
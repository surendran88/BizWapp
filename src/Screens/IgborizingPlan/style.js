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

emailimage:{
    marginLeft:responsiveWidth(4)
},
lockimage:{
   
    marginLeft:responsiveWidth(5)
},
bgView:{
  height:responsiveHeight(10),
  width:responsiveWidth(100),
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row'
},
homeText:{
  marginTop:responsiveHeight(2),
  fontSize:responsiveFontSize(3.6),
  color:color.white,
  fontFamily:'LakkiReddy'
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
    fontSize:responsiveFontSize(1.7),
    color:color.white,
    marginLeft:responsiveWidth(2),
    marginTop:responsiveHeight(1)
},

loginButtonText:{
    fontSize:responsiveFontSize(2.5),
    fontWeight:'600',
    color:color.white

},
forgotButtonText:{
    marginTop:responsiveHeight(3),
    fontSize:responsiveFontSize(2),
    fontWeight:'600',
    color:color.white,

},
imageBackground:{
    width: '100%', 
    height: '100%',
    alignItems:'center',
    justifyContent:'flex-start',
   
},
signUpButtonText:{
    //marginTop:Dimensions.get('screen').height/2,
    fontSize:responsiveFontSize(2),
    // fontWeight:'600',
   

},
modalContainer:{
    // backgroundColor:color.blue,
    // borderRadius:20,
    // padding:responsiveWidth(4)
    justifyContent:'flex-start',
    alignItems:'center'
  },
  sideBarView:{
    // backgroundColor:color.blue,
    
    justifyContent:'flex-start',
    alignItems:'flex-start',
    width:responsiveWidth(70),
    height:responsiveHeight(100),
   
  },
  SpeakView:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:color.yellow,
    width:143,
    height:143,
    borderRadius:143/2

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
    },
    modalButton:{
      
      height:responsiveWidth(12) , 
      backgroundColor:color.white,
      borderRadius:responsiveWidth(15),
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:responsiveWidth(5),
      marginTop:responsiveHeight(1),
      width:responsiveWidth(35)
  },
  learningView:{
    justifyContent:'center',
    alignItems:'flex-start',
    width:responsiveWidth(90),
    height:Platform.OS==='ios'?responsiveHeight(20):responsiveHeight(25)
  },
  learningCategoryView:{
    color:color.white,
    fontSize:responsiveFontSize(2.6),
    marginLeft:responsiveWidth(5),
    marginTop:responsiveHeight(1),
    // fontWeight:'bold',
    width:responsiveWidth(50),
    fontFamily:'LakkiReddy',
    // fontWeight:'normal'
  },
  learningtextView:{
    fontFamily:'LakkiReddy',
    // fontSize:responsiveFontSize(3),
    
  },
  subscriptionTextView:{
    color:color.white,
    fontSize:responsiveFontSize(1.3),
  
  },
  modalSendImg:{
    flex:0,
    backgroundColor:'#808080'
  },
  modalSendText:{
    
    // fontWeight:'bold',
    fontSize:responsiveFontSize(2.2),
    fontFamily:'LakkiReddy'
  },

headerView:{
    justifyContent:'flex-start',
    alignItems:'center',
    
    width:responsiveWidth(100),
    height:responsiveHeight(5),
    marginTop:responsiveHeight(1),
    flexDirection:'row'
},
textStyle:{
      // fontWeight:'bold',
      fontSize:responsiveFontSize(2.2),
      fontFamily:'LakkiReddy' 
 
},
textHeaderStyle:{
    fontWeight:'bold',
  fontSize:responsiveFontSize(2.2),
  fontFamily:'LakkiReddy'
},
item:{
 
  fontFamily:'LakkiReddy',
 
},
component: {
  width: Dimensions.get('window').width,
  alignItems: 'center',
  backgroundColor: 'white',
  borderColor: 'grey',
  borderTopWidth: StyleSheet.hairlineWidth,
  borderBottomWidth: StyleSheet.hairlineWidth
},
header: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 5
},
arrowButton: {
  paddingHorizontal: 10
},
title: {
  color: 'grey',
  fontWeight: 'bold'
},
week: {
  width: '100%',
  borderBottomColor: 'grey',
  borderBottomWidth: StyleSheet.hairlineWidth,
  paddingVertical: 5
},
weekdayLabelContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10
},
weekdayLabel: {
  flex: 1,
  alignItems: 'center'
},
weekdayLabelText: {
  color: 'grey'
}, 
weekdayNumberContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 5
},
weekDayNumber: {
  flex: 1,
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center'
},
weekDayNumberCircle: {
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: 30/2,
},
weekDayNumberTextToday : {
  color: 'white'
},
schedule: {
  width: '100%'
},
pickerButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: 'white'
},
picker: {
  backgroundColor: 'white',
  paddingBottom: 20
},
modal: {
  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'flex-end'
},
blurredArea: {
  flex: 1,
  opacity: 0.7,
  backgroundColor: 'black'
},
modalButton: {
  padding: 15
},
modalButtonText: {
  fontSize: 20
},
indicator: {
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'absolute'
},
day: {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  borderTopColor: 'grey',
  borderTopWidth: StyleSheet.hairlineWidth,
},
dayLabel: {
  width: '20%',
  alignItems: 'center',
  padding: 10,
  borderRightColor: 'grey',
  borderRightWidth: StyleSheet.hairlineWidth,
},
monthDateText: {
  fontSize: 20
},
dayText: {
  
},
allEvents: {
  width: '80%',
},
event: {
  flex: 1,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  backgroundColor:"#dedede"
},
eventDuration: {
  width: '30%',
  justifyContent: 'center'
},
durationContainer: {
  flexDirection: 'row',
  alignItems: 'center'
},
durationDot: {
  width: 4,
  height: 4,
  backgroundColor: 'grey',
  marginRight: 5,
  alignSelf: 'center',
  borderRadius: 4/2,
},
durationDotConnector: {
  height: 20,
  borderLeftColor: 'grey',
  borderLeftWidth: StyleSheet.hairlineWidth,
  position: 'absolute',
  left: 2
},
durationText: {
  color: 'grey',
  fontSize: 12
},
eventNote: {
},
lineSeparator: {
  width: '100%',
  borderBottomColor: 'lightgrey',
  borderBottomWidth: StyleSheet.hairlineWidth,
},
dot: {
  width: 4,
  height: 4,
  marginTop: 1,
  alignSelf: 'center',
  borderRadius: 4/2,
  position: 'absolute',
  bottom: '10%'
}
});
  export default styles;
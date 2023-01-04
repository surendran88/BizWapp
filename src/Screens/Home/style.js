import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import color from '../../components/Colors'
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: color.white,
    marginTop: Platform.OS === 'ios' ? responsiveHeight(4.2) : null
  },

  emailimage: {
    marginLeft: responsiveWidth(4)
  },
  lockimage: {

    marginLeft: responsiveWidth(5)
  },
  bgView: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  homeText: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(3.8),
    color: color.purple,
    fontFamily: 'LakkiReddy'
  },
  forgotText: {
    marginTop: responsiveHeight(12),
    fontSize: responsiveFontSize(3),
    color: '#4E97F5'
  },
  emailTextInput: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(3),

  },

  RememberView: {
    height: responsiveHeight(6),
    width: responsiveWidth(80),
    justifyContent: 'center',
    flexDirection: 'row'
  },
  RememberMeTextView: {
    fontSize: responsiveFontSize(1.7),
    color: color.white,
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(1)
  },

  loginButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    color: color.white

  },
  forgotButtonText: {
    marginTop: responsiveHeight(3),
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: color.white,

  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  signUpButtonText: {
    //marginTop:Dimensions.get('screen').height/2,
    fontSize: responsiveFontSize(2),
    // fontWeight:'600',


  },
  modalContainer: {
    // backgroundColor:color.blue,
    // borderRadius:20,
    // padding:responsiveWidth(4)
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  sideBarView: {
    // backgroundColor:color.blue,

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: responsiveWidth(70),
    height: responsiveHeight(100),

  },
  SpeakView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.yellow,
    width: 143,
    height: 143,
    borderRadius: 143 / 2

  },
  modalHead: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
  },
  modalHeading: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
    paddingLeft: Platform.OS === 'ios' ? responsiveWidth(6) : responsiveWidth(0),
    fontFamily: 'OpenSans-Italic',
    color: color.white
  },
  modalCross: {
    flex: 0,
    left: Platform.OS === 'ios' ? responsiveWidth(12) : responsiveWidth(15)
  },
  modalInput: {
    borderBottomWidth: responsiveHeight(0.2),
    borderBottomColor: color.white,
    margin: Platform.OS === 'ios' ? responsiveHeight(0.6) : responsiveHeight(0.4),
    fontSize: responsiveFontSize(2),
    width: Platform.OS === 'ios' ? responsiveWidth(78) : responsiveWidth(80),
    fontWeight: '400',
    marginTop: Platform.OS === 'ios' ? responsiveHeight(5) : responsiveHeight(3),
    marginBottom: Platform.OS === 'ios' ? responsiveHeight(5) : responsiveHeight(5),
    paddingLeft: Platform.OS === 'ios' ? responsiveWidth(2) : responsiveWidth(0),
    paddingBottom: Platform.OS === 'ios' ? responsiveWidth(1) : responsiveWidth(0),
  },
  modalButton: {

    height: responsiveWidth(7),
    backgroundColor: color.white,
    borderRadius: responsiveWidth(15),
    // flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    // width:responsiveWidth(15),


  },
  learningView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: responsiveWidth(90),
    overflow: 'hidden',
    borderBottomLeftRadius: responsiveHeight(2),
    borderColor: color.white,
    borderTopRightRadius: responsiveHeight(2)
  },
  guidanceView: {
    color: color.white,
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(4),
    marginTop: responsiveHeight(0.1),
    width: responsiveWidth(40),
    fontFamily: 'LakkiReddy',
    alignSelf: "flex-start",

  },
  learningView1: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: responsiveWidth(45),

  },
  learningImageView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
    width: responsiveWidth(45),

    borderTopLeftRadius: responsiveHeight(17),
    borderColor: color.white,
    borderBottomLeftRadius: responsiveHeight(5),

    height: Platform.OS === 'ios' ? responsiveHeight(20) : responsiveHeight(25)
  },
  learningCategoryView: {
    color: color.white,
    fontSize: responsiveFontSize(2.6),
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(1),
    // fontWeight:'bold',
    width: responsiveWidth(50),
    fontFamily: 'LakkiReddy',

    // fontWeight:'normal'
  },
  learningtextView: {
    fontFamily: 'LakkiReddy',
    fontSize: responsiveFontSize(3),
    color: color.white,
    marginTop: responsiveHeight(1)
  },
  learningCategoryTextView: {
    color: color.white,
    fontSize: responsiveFontSize(1.5),
    marginLeft: responsiveWidth(5),
    width: responsiveWidth(40),
    fontFamily: 'Opensans',
  },
  modalSendImg: {
    flex: 0,
    backgroundColor: '#808080'
  },
  modalSendText: {

    // fontWeight:'bold',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'LakkiReddy',
    height: responsiveHeight(2),
    marginLeft: responsiveWidth(1),
    marginRight: responsiveWidth(1)


  },

  purpleView: {
    borderRadius: 50,
    width: responsiveWidth(90),
    height: responsiveHeight(75),
    marginTop: responsiveHeight(1)
  },
  calendarButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: responsiveHeight(1.2),
    borderRadius: 30,

    elevation: 3
  },
  calendarTextButton: {
    color: color.white,

  },
  guidanceViewButton: {
    alignItems: 'flex-end',
    marginLeft: responsiveWidth(25),
    marginTop: responsiveHeight(2)
  },

  vvlCalendar: {
    backgroundColor: '#2575c2'
  }
});
export default styles;
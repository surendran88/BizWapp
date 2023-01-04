import { Platform, StyleSheet } from 'react-native';
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

  bgView: {
    height: responsiveHeight(10),
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageThumbnail: {
    flexDirection: 'row',
    flex: 1
  },
  homeText: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(3.6),
    color: color.white,
    fontFamily: 'LakkiReddy'
  },


  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

  },

  headerView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(5),
    marginTop: responsiveHeight(1),
    flexDirection: 'row'
  }
});
export default styles;
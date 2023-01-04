import React, { Component } from 'react'; 
import { Text, View, Image, ImageBackground, TouchableOpacity,FlatList, ScrollView,KeyboardAvoidingView } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors' 
import * as whatsnewListAction from '../../redux/actions/WhatsnewListAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay'; 
import Orientation from 'react-native-orientation'; 
const backgroundIg = require('../../../assets/home-bg.png'); 
const backIg = require('../../../assets/btn-back.png');
const headerImage = require('../../../assets/top-bar.png'); 


class WhatsnewList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarVisible: false,
      isModalVisible: false,
      isSubscribe: true,
      category: 'contact',
      isContact: true,
      name: '',
      email: '',
      subject: '',
      message: '',
      alertMessage: '',
      index: 0,
      isloading: true,
      res: [],
      studyData: {},
    }
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: responsiveHeight(3),
          width: "100%"
        }}
      />
    );
  };


  onImageSelected = () => {
    //TODO
  }
  UNSAFE_componentWillMount() {
    Orientation.lockToPortrait()
    let { actions } = this.props;
    this.setState({ isloading: true })
    actions.whatsnewList();
    let _this = this;
    setTimeout(() => {
      let { whatnewdata, whatnewloading, whatnewmessage, whatnewresult } = _this.props
      if (whatnewresult) {
        _this.setState({ isloading: whatnewloading })
        _this.setState({ res: whatnewdata })
      }
    }, 5000);

  }

  //Design
  render() {

    return (
      <View style={GlobalStyle.container}>
        {(this.state.isloading) && <Spinner
          visible={this.state.isloading}
          textContent={'Loading...'}
          textStyle={{ color: color.white }}
        />}
        <View style={Styles.subContainer}>
          <KeyboardAvoidingView style={{ width: responsiveWidth(100) }} behavior='position' enabled>
            <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{ resizeMode: 'stretch' }}>
              <View style={Styles.bgView}>
                <ImageBackground source={headerImage} style={{ width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginLeft: responsiveWidth(4) }}><Image source={backIg}></Image></TouchableOpacity><Text style={{ fontSize: responsiveFontSize(3), marginLeft: responsiveWidth(3), marginRight: responsiveWidth(25), color: color.white, fontFamily: 'LakkiReddy', marginTop: responsiveHeight(1) }}>Nke na-Ewu (What's New)</Text>
                </ImageBackground>
              </View>
              <ScrollView>
                <View style={[Styles.purpleView, { flex: 1, width: responsiveWidth(90), marginTop: responsiveHeight(3), flexDirection: "row", flexWrap: "wrap" }]}>
                  <FlatList
                    data={this.state.res}
                    renderItem={({ item, index }) =>
                      <TouchableOpacity style={Styles.imageThumbnail}  onPress={this.onImageSelected} >
                        <ImageBackground style={{ backgroundColor: color.white, height: responsiveHeight(30), width: responsiveWidth(100) }} imageStyle={{ resizeMode: 'center' }} source={{ uri: (item.file_type == 4) ? item.file_name : item.file_name }} >
                        </ImageBackground>
                      </TouchableOpacity>
                    }
                    ItemSeparatorComponent={this.renderSeparator}
                  />
                </View>
              </ScrollView>
            </ImageBackground>
          </KeyboardAvoidingView>
        </View>

      </View>
    );
  }
}
const mapStateToProps = state => ({
  whatnewdata: state.whatsnewListApiResponseDataConfig.whatnewdata,
  whatnewloading: state.whatsnewListApiResponseDataConfig.whatnewloading,
  whatnewmessage: state.whatsnewListApiResponseDataConfig.whatnewmessage,
  whatnewresult: state.whatsnewListApiResponseDataConfig.whatnewresult,
});
const ActionCreators = Object.assign(
  {},
  whatsnewListAction,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});
export default connect(mapStateToProps, mapDispatchToProps)(WhatsnewList)
import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, FlatList, Platform, Alert, KeyboardAvoidingView, Linking, ScrollView } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';


import Styles from './style';
import GlobalStyle from '../../GlobalStyle'
import color from '../../components/Colors'
import * as eventAction from '../../redux/actions/eventAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation';
import { Calendar, Agenda } from 'react-native-calendars';
import moment from 'moment/min/moment-with-locales';
const backgroundIg = require('../../../assets/home-bg.png');
const headerImage = require('../../../assets/top-bar.png');


const backImage = require('../../../assets/btn-back.png');



class IgborizingPlan extends React.PureComponent {

  constructor(props) {

    super(props);
    this.state = {
      items: {},
      selectedDate: '',
      isSideBarVisible: false,
      isModalVisible: false,
      isSubscribe: true,
      category: 'event',
      isContact: true,
      name: '',
      email: '',
      subject: '',
      message: '',
      alertMessage: '',
      isloading: true
    }

  }

  setSelectedDay = (day) => {
    // this.setState({ selectedDate: day.dateString})
    //alert(day.dateString)
  }


  UNSAFE_componentWillReceiveProps = (nextProps) => {
    // if(nextProps.)
    setTimeout(() => {
      this.redefineDataEvent()
    }, 3000);

  }

  UNSAFE_componentWillMount() {
    Orientation.lockToPortrait()
    let { actions } = this.props;
    this.setState({ isloading: true })
    actions.getNDewoData({});
    let _this = this;

  }



  UNSAFE_componentWillUpdate(Props, state) {

    console.log(state.selectedDate, this.state.selectedDate);
    if (state.selectedDate != this.state.selectedDate) {
      this.setState({ isLoading: true });
      // this.loadItems(state.selectedDate);

    }
  }
  r = () => {
    return Math.floor(Math.random() * 256);
  }


  redefineDataEvent = () => {
    let { data, loading, message, result } = this.props

    var resultList = data.schedules;
    if (resultList && resultList.length > 0) {
      const items = resultList.reduce((group, data) => {
        const { date } = data;
        let calDate = new Date();
        calDate.setDate(date);
        const color = "rgb(" + this.r() + "," + this.r() + "," + this.r() + ")";
        let formatCalDate = moment(calDate).format("YYYY-MM-DD")
        group[formatCalDate] = group[formatCalDate] ?? []
        group[formatCalDate].push({
          name: data.title,
          backgroundColor: color,
          eventTextColor: "#000",
          url: data.url,
          urlText: data.url_text,
          fromTime: data.time_from,
          toTime: data.time_to,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          day: formatCalDate
        });
        return group;
      }, {})
      //   console.log("refine items =======",items)
      this.setState({ items: items });
      this.setState({ isLoading: false });
    }

  }
  getFirstDayOfWeek(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
  navigateEvent = (event) => {
    let { message } = this.props;
    if (message == 'Subscription expired') {
      this.props.navigation.navigate('Subscription');
    }

  }
  renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = reservation.eventTextColor ? reservation.eventTextColor : '#43515c';
    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height, backgroundColor: reservation.backgroundColor, borderColor: reservation.borderColor }]}
        onPress={() => {
          if (reservation.url)
            Linking.openURL(reservation.url);
          else
            this.navigateEvent(reservation);
        }}
      >
        <Text style={{ fontSize, color }}>{reservation.name}  </Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }
  renderEmptyData = () => {
    return (
      <View style={styles.emptyDate}>
        <Text> No Event</Text>
      </View>
    );
  }
  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  //Design
  render() {


    return (
      <View style={GlobalStyle.container}>

        <View style={Styles.usbContainer}>
          {(this.state.isLoading) && <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={{ color: color.white }}
          />}
          <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{ resizeMode: 'stretch' }}>
            <View style={Styles.bgView}>
              <ImageBackground source={headerImage} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={{ width: responsiveWidth(60), height: responsiveHeight(10), flexDirection: 'row', marginTop: responsiveHeight(1), justifyContent: 'space-between', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {})} style={{ marginLeft: responsiveWidth(4) }}><Image source={backImage}></Image></TouchableOpacity>
                  <Text style={{ fontSize: responsiveFontSize(3), color: color.white, marginRight: responsiveWidth(5), marginLeft: responsiveWidth(5), fontFamily: 'LakkiReddy' }}> IgborizingPlan </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ width: responsiveWidth(100), height: responsiveHeight(90), flexDirection: 'row', justifyContent: 'space-between' }}>
              <Agenda
                items={this.state.items}
                renderItem={this.renderItem}
                renderEmptyData={this.renderEmptyData}
                renderEmptyDate={this.renderEmptyDate}
                rowHasChanged={this.rowHasChanged}
                showClosingKnob={true}
                onDayPress={this.setSelectedDay}
              />
            </View>
          </ImageBackground>
        </View>

      </View>
    );
  }
}
const mapStateToProps = state => ({


  data: state.eventReducerApiResponseDataConfig.data,
  loading: state.eventReducerApiResponseDataConfig.loading,
  message: state.eventReducerApiResponseDataConfig.message,
  result: state.eventReducerApiResponseDataConfig.result,




});

const ActionCreators = Object.assign(
  {},
  eventAction,

);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(IgborizingPlan)
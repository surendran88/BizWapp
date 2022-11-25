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
import Utils from '../../Utils/utils';
import Orientation from 'react-native-orientation';
import { Calendar, Agenda } from 'react-native-calendars';
import WeeklyCalendar from 'react-native-weekly-calendar';
import moment from 'moment/min/moment-with-locales';
const backgroundIg = require('../../../assets/home-bg.png');
const headerImage = require('../../../assets/top-bar.png');
import dataList from './mockData';
import testIDs from './testID';

const backImage = require('../../../assets/btn-back.png');

const itemsList = dataList.result;

class CalendarEvents extends React.PureComponent {

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

    this.loadItems(moment().format("YYYY-MM-DD"))
  }

  setSelectedDay = (day)=>{
    this.setState({ selectedDate: day.dateString})
    //alert(day.dateString)
  }
  loadItemsforMonth=()=>{
    console.log("loadItemsforMonth++++++++++++++++")

  }
  loadItems = (day) => {
    const items = this.state.items || {};
    var date =   day;
   console.log("loadItems++++++++++++++++")
    const firstDay = this.getFirstDayOfWeek(date);
  
    const lastDay = new Date(firstDay);
    this.setState({ selectedDate: date, startDay:firstDay,endDay:lastDay });
    lastDay.setDate(lastDay.getDate() + 6);
    let params = { params: { 'ctype': 'events', "start": moment(firstDay).format("YYYY-MM-DD"), "end":  moment(lastDay).format("YYYY-MM-DD") } }
    let { actions } = this.props;

    actions.getEventData(params);
   

  }
UNSAFE_componentWillReceiveProps=(nextProps)=>{
 // if(nextProps.)
 
setTimeout(() => {
  this.redefineDataEvent()

}, 3000);

 console.log("UNSAFE_componentWillReceiveProps++++++++++++++++")
}
 

UNSAFE_componentWillUpdate(Props, state){
   
console.log(state.selectedDate,this.state.selectedDate);
  if(state.selectedDate!=this.state.selectedDate){
    this.setState({ isLoading:true});
    console.log("UNSAFE_componentWillUpdate if++++++++++++++++")
       this.loadItems(state.selectedDate);
        
  }
}

  redefineDataEvent = () => {
    let { data, loading, message, result } = this.props
    //this.setState({ items: {} });
    var resultList = result;
   // alert(this.state.selectedDate)
    if (resultList[0] && resultList[0].length > 0) {
      const items=  resultList[0].reduce((group, data )=>{
          const {date}=data;
          group[date]=group[date] ?? []
          group[date].push({
            name:  data.title,
            backgroundColor: data.backgroundColor,
            eventTextColor: data.eventTextColor,
            borderColor:  data.borderColor,
            className: data.className,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: data.date
          });
          return group;
      },{})
    /*resultList[0].forEach((data, index, arr) => {
          items[data.date]=[]
        if (data.allDay) {
          items[data.date].push({
            name:  data.title,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: data.date
          });
          //delete data.date
        }
        else {
          items[data.date].push({
            name:  data.title,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: data.date
          });
         // data.duration = data.end !== undefined ? data.end.split(" ")[1] : "00:00:00";
        }
        //  console.log("ssssssssssssssssssssssssssssssssssss",data);
      
      })
        this.setState({items: {
      '2022-11-22': [{name: 'item 1 - any js object'}],
      '2022-11-23': [{name: 'item 2 - any js object', height: 80}],
      '2022-11-24': [{name: 'item 2 - any js object', height: 80}],
      '2022-11-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
    }})
      */
     // console.log("Event Calendar  items++++++++++++",items);
   this.setState({ items: items });
   this.setState({ isLoading:false});
   //this.forceUpdate();
    }
   
  }
  getFirstDayOfWeek(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = reservation.eventTextColor ? reservation.eventTextColor  : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height, backgroundColor:reservation.backgroundColor, borderColor:reservation.borderColor}]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{fontSize, color}}>{reservation.name}</Text>
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
  /*renderDate(date, item) {
    
    const today = date && isToday(date) ? style.today : undefined;
    const dayNames = getDefaultLocale().dayNamesShort;
    if (date) {
        return (<View style={style.day} testID={testIDs.agenda.RESERVATION_DATE}>
      <Text allowFontScaling={false} style={[this.style.dayNum, today]}>
        {date.getDate()}
      </Text>
      <Text allowFontScaling={false} style={[style.dayText, today]}>
        {dayNames ? dayNames[date.getDay()] : undefined}
      </Text>
    </View>);
    }
    else {
        return <View style={this.style.day}/>;
    }
}
*/
  //Design
  render() {
 

    return (
      <View style={GlobalStyle.container}>

        <View style={Styles.usbContainer}>
        {(this.state.isLoading) && <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          textStyle={{color: color.white}}
                    />   } 
          <ImageBackground source={backgroundIg} style={Styles.imageBackground} imageStyle={{ resizeMode: 'stretch' }}>
            <View style={Styles.bgView}>
              <ImageBackground source={headerImage} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={{ width: responsiveWidth(60), height: responsiveHeight(10), flexDirection: 'row', marginTop: responsiveHeight(1), justifyContent: 'space-between', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {})} style={{ marginLeft: responsiveWidth(4) }}><Image source={backImage}></Image></TouchableOpacity>
                  <Text style={{ fontSize: responsiveFontSize(3), color: color.white, marginRight: responsiveWidth(5), fontFamily: 'LakkiReddy' }}>Calendar</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ width: responsiveWidth(100), height: responsiveHeight(90), flexDirection: 'row', justifyContent: 'space-between' }}>
            
<Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
    //   loadItemsForMonth={this.loadItemsforMonth}
      //  initialDate={this.state.selectedDate}
    //  selected={this.state.selectedDate}
        renderItem={this.renderItem}
        renderEmptyData={this.renderEmptyData}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
        onDayPress={this.setSelectedDay}

        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
  
            </View>


          </ImageBackground>


        </View>

      </View>
    );
  }
}
const mapStateToProps = state => ({


  messageData: state.eventReducerApiResponseDataConfig.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarEvents)
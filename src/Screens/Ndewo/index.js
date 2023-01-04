import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, FlatList, Platform, Alert, KeyboardAvoidingView, Linking, ScrollView } from 'react-native';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import GlobalStyle from '../../GlobalStyle';
import styles from './style';

import color from '../../components/Colors';
import * as eventAction from '../../redux/actions/eventAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Orientation from 'react-native-orientation';
import moment from 'moment/min/moment-with-locales';
const backgroundIg = require('../../../assets/home-bg.png');
const headerImage = require('../../../assets/top-bar.png');
const backImage = require('../../../assets/btn-back.png');
import {  Agenda } from 'react-native-calendars';


class Ndewo extends React.PureComponent {

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

    //this.loadItems(moment().format("YYYY-MM-DD"))
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

    var resultList = data.schedules ? data.schedules : [];
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
      console.log("refine items =======", items)
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

        <ScrollView >

          <ImageBackground source={backgroundIg} style={styles.imageBackground} imageStyle={{ resizeMode: 'stretch' }}>
            <View style={styles.bgView}>
              <ImageBackground source={headerImage} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <View style={{ width: responsiveWidth(60), height: responsiveHeight(10), flexDirection: 'row', marginTop: responsiveHeight(1), justifyContent: 'space-between', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {})} style={{ marginLeft: responsiveWidth(4) }}><Image source={backImage}></Image></TouchableOpacity>
                  <Text style={{ alignText: 'center', fontSize: responsiveFontSize(3), marginLeft: responsiveWidth(3), color: color.white, marginRight: responsiveWidth(5), fontFamily: 'LakkiReddy' }}>Ndewo (Welcome)</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ marginLeft: responsiveWidth(3)}}>
            <Text style={styles.paragraph}>
                {`\n Ndewo (welcome) to BiaWaZo learning hub! This specific Virtual Igbo Learning Program is powered by 'Akwukwo LLC' and is a one stop hub for your kids Igborizing needs.
           \n For tangible results, we recommend that kids log-in daily and LEARN for at least 5 minutes. Naturally, the more time spent within this program portal, PLUS frequent practicing of what was learned, will lead to higher fluency.
           \n  If you were referred to our program, could you please share the name and email address of the person that referred you via eMail to:contact@biawazo.com?
           \n  Please also refer our innovative program to family and friends… Your enrolled child would receive $5 for ALL annual enrollments that result from your referral.
              `}</Text>

              <Text style={styles.headertitle}>Program Details</Text>
              <Text style={styles.paragraph}>
                {`\n Our Virtual Igbo Learning program consists of three main levels:`}</Text>
              <Text style={styles.paragraph}>
              {` \n - Mbido (Beginner)
                \n  - Onye Matu (Intermediate)
                \n  - Ama-ala (Advanced)
                \n All 3 levels have Lessons and Activities modules. Our 'Lessons' teach Igbo in an engaging way, using animated videos. Each Lesson module has corresponding Sụọ (speak), Gụọ (read) and Dee (write) Activities that get our learning friends to practice, which ultimately ensures retention.
                \n Dee Activities requires our pals to have physical writing materials handy... therefore, we suggest you dedicate an 'igborizing' notebook for that purpose :)
                `}
              <TouchableOpacity  onPress={()=>{Linking.openURL("https://www.youtube.com/watch?v=4AgAewDKCeY&amp;feature=youtu.be")}}><Text>  Click HERE </Text></TouchableOpacity>  <Text> to see a NAVIGATION demonstration for one Lesson as well as its corresponding Speak, Read and Write Activities.</Text>
 
              </Text>

              
              <Text style={styles.paragraph}>
                {` \n Note that our Dee Activities requires our pals to have physical writing materials handy... therefore, we suggest you dedicate an 'igborizing' notebook for that purpose :)
                 \n In addition to the aforementioned 3 levels, we feature an Igborizing Hub which consists of:
                
                 \n - Igbo Alphabets and Numbers
                 \n - Igborizing Homework (in no specific order)
                 \n  - Homework Answers
                 \n  - Igbo Flashcards
                 \n - Igborized Christian topics
                 \n - Igborized Seasonal topics including Valentine's day, Mother's Day, Easter, Father's Day, Biafra, Christmas, New Year, etc.
                 \n - Kid-to-Kid Chats: a unique opportunity for enrolled kids to video chat with others on a frequent basis for about 5 minutes
                 \n • Click on 'Kid-to-Kid Chats' image below to indicate interest
                 \n  - Kid-to-Kid Chat prompts to help facilitate the first 10 to 12 video chats
                 \n - Kid written blogs and vlogs interest and submissions
                 \n • Click on 'Blog Today Kids' image below for more details
                 \n   - Access to our LIVE virtual classes and sessions
                 \n  - Interactive printable worksheets
                 \n  - Igbo songs and games
                 \n - PLUS more…
                 \n
                `}
                <TouchableOpacity onPress={()=>{Linking.openURL("https://www.youtube.com/watch?v=3W7Xo5Yx_zQ&feature=youtu.be")}}><Text>  Click HERE </Text></TouchableOpacity>  <Text> or a navigation 'demo' to view all content within Igborizing Hub, and some Dee (write), sections.</Text>
              
              </Text>
              <Text style={styles.headertitle}>Getting Started</Text>
              <Text style={styles.paragraph}>
                {` \n
              Although our program is flexible and self-led, we have found that structure helps our enrolled umuaka (children) to learn more effectively and/or continue to improve on current knowledge.
              \n Hence, we have curated daily learning content as shown on the calendar in our VLL landing page. This makes it easily accessible for kids to click on the content within respective day to igborized effectively.
              \n Each day's learning takes about  5 minutes and can be done from anywhere in the world, at any time, at the child’s pace and convenience.
              \n Easy peasy and doable, ọkwa ya (right)?

                `}</Text>
           
      
              <Text style={styles.paragraph}>
              
              {` \n
                To help our lgborizing friends practice what they learned each month, we:
                \n 1.) Hold monthly live Nkata (chat) sessions to interact with enrolled kids and practice what we learned that month
                \n 2.) Provide engaging printable worksheets that address each month's learning. This helps with retention.
                \n 3.) Provide seasonal animated Igbo learning content and/or printable worksheets for holidays and events that fall in applicable months
                `}</Text>
              <Text style={styles.paragraph}>
                {` \n
            All printable Igbo worksheets can be accessed by navigating to the Igborizing Hub > Seasonal > Hot Topic (1, 2 or 3)
            \n If you're a beginner and enrolled after January and/or February, we suggest you start with our 30-day 'Starter Igborizing Plan'. It is a month-long Igbo learning guide that teaches early learners to introduce themselves with basic information AND pose similar questions to other people… amongst other things.
            \n Our 30-Day started plan can be accessed here by scrolling down to the calendar below. Click on each day’s content to learn and practice.
            \n We strongly encourage non-beginner learners to use this 30-day Starter Igborizing Plan if they can’t fluently introduce themselves and/or ask introductory questions yet, in Igbo :)
              
                `}</Text>
              <Text style={styles.headertitle}>Further Improving</Text>

              <Text style={styles.paragraph}>
                {` \n We're here to help ensure our enrolled friends learn Igbo in a relatable, efficient way… PLUS retain knowledge. So, we tend to rehash the basics especially during focused initiatives, such as Summer and/or Long Holiday Camp, as they're foundational for long-term retention.
                \n However, this program portal contains loads of great Igbo learning content for kids, ages 2 to late teens, at EVERY speaking level. All of which cannot possibly be reflected in the daily learning schedules.
                \n Therefore, we IMPLORE all KIDS to explore beyond the content we've laid out in any learning plans or calendars. Please encourage, enable and empower them to 'click, click, click, click, click' away within our portal as often as possible…
                \n This will ensure a more robust knowledge of our Igbo language.`}</Text>
              <Text style={styles.headertitle}>Staying Engaged</Text>

              <Text style={styles.paragraph}>
                {` \n We are here for ALL our learning friends.
                \n So, please feel free to contact us via eMail (contact@biawazo.com) or on WhatsApp (+1 281 785 4404) anytime. You can click on the 'Chat with US on WhatsApp' image below to send us a direct message NOW.
                \n Note that we send out occasional WhatsApp messages and reminders via broadcast (you don’t get added to a group) to enrolled families.
                \n TTo receive our broadcast, please provide your number by Clicking HERE You have to SAVE our number to your device to receive our WhatsApp messages though… To stop receiving messages, from us anytime, send a WhatsApp message to that number and we'll remove you immediately.
                \n If you're on social media, please get social with us. We post Igborizing content and share Igborizing updates that would be of interest to your family. Eziokwu (for real) :)
                \n `}

              </Text>
              <Text>
                <TouchableOpacity onPress={()=>{Linking.openURL("https://www.instagram.com/Akwukwo/")}}><Text>Click HERE </Text></TouchableOpacity>  <Text>to chill with us on Instagram </Text>
              <TouchableOpacity onPress={()=>{Linking.openURL("https://www.facebook.com/igborize")}}><Text>Click HERE </Text></TouchableOpacity> <Text>to join us on Facebook</Text>
              <TouchableOpacity onPress={()=>{Linking.openURL("https://twitter.com/AkwukwoLLC")}}><Text>Click HERE </Text></TouchableOpacity> <Text>to yarn us on Twitter</Text>
              <TouchableOpacity onPress={()=>{Linking.openURL("https://www.youtube.com/channel/UCaxnP38lionMGpvZh1qKqWA")}}><Text>Click HERE </Text></TouchableOpacity> <Text>to subscribe us on YouTube </Text>
              </Text>
                <Text>
                    Lastly as with any new experience, it may take you and/or your child a few tries to familiarize yourself with our learning portal. If you have questions on navigation, please    <TouchableOpacity onPress={()=>{Linking.openURL('https://www.youtube.com/playlist?list=PLVZClbqbigygOz5VKe3jaHbBbbzkGzAq0')}}><Text>Click HERE </Text></TouchableOpacity>   to check out some of our pre-recorded Demos. If none address your enquiry, biko send us a WhatsApp message or an email with your question.

              </Text>
              <Text style={styles.paragraph}>
                {`
                        \n    Thank you once again for enrolling your child(ren) in our Virtual Igbo Learning program!
                        \n    Ka-anyi mee ya (let's do it)! `}

              </Text>
              <Text style={styles.headertitle}>Starter Igborizing Plan</Text>
              <Text style={styles.headertitle}>Kedu (hello),</Text>
            
              <Agenda
                items={this.state.items}
                renderItem={this.renderItem}
                renderEmptyData={this.renderEmptyData}
                renderEmptyDate={this.renderEmptyDate}
                rowHasChanged={this.rowHasChanged}
                showClosingKnob={false}
                onDayPress={this.setSelectedDay}
              />
            </View>
          </ImageBackground>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ndewo)
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// import { createDrawerNavigator } from 'react-navigation-drawer'; 
// import { responsiveWidth } from 'react-native-responsive-dimensions';
import React, { Fragment, Component } from 'react';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import LessonListing from './Screens/LessonListing';
import Subscription from './Screens/Subscription';
import ContactUs from './Screens/ContactUs';
import Blog from './Screens/Blog';
import MediaGallery from './Screens/MediaGallery';
import Lessons from './Screens/Lessons';
import LessonDetails from './Screens/LessonDetails';
import AboutUs from './Screens/AboutUs';
import StudyMaterials from './Screens/StudyMaterials';
import AddSubscription from './Screens/AddSubscription';
import Profile from './Screens/Profile';
import video from './Screens/MediaGallery/video';
import pdf from './Screens/MediaGallery/pdf';
import BlogComent from './Screens/BlogComent';
import Faq from './Screens/Faq';
import CalendarEvents from './Screens/CalendarEvents';
import IgborizingPlan from './Screens/IgborizingPlan';
import LearningProgress from './Screens/LearningProgress';
import WhatsnewList from './Screens/WhatsnewList';
import Ndewo from './Screens/Ndewo';
import AsyncStorage from '@react-native-async-storage/async-storage';
//initGlobal();
var value;
/*import stripe from 'tipsi-stripe';
stripe.setOptions({
	publishableKey:'pk_live_XeuUMD5MLCmbNDo8TpoDgL3700aC2ENsxW'
	// publishableKey:'pk_test_m2LvrQeYBzXNgUpB8RJIGxIk00xjcA0zeV'
})*/
import { StripeProvider } from '@stripe/stripe-react-native';
//const value =  AsyncStorage.getItem('userId')
const getUser = async (key) => {

	//this.setState({isLoading:true})
	value = await AsyncStorage.getItem(key)
	return value
}

const AppNavigator = createStackNavigator(
	{

		Login: { screen: Login, navigationOptions: { gestureEnabled: false } },
		SignUp: { screen: SignUp, navigationOptions: { gestureEnabled: false } },
		Home: { screen: Home, navigationOptions: { gestureEnabled: false } },
		LessonListing: { screen: LessonListing, navigationOptions: { gestureEnabled: false } },
		Subscription: { screen: Subscription, navigationOptions: { gestureEnabled: false } },
		ContactUs: { screen: ContactUs, navigationOptions: { gestureEnabled: false } },
		CalendarEvents: { screen: CalendarEvents, navigationOptions: { gestureEnabled: false } },
		IgborizingPlan: { screen: IgborizingPlan, navigationOptions: { gestureEnabled: false } },
		Ndewo: { screen: Ndewo, navigationOptions: { gestureEnabled: false } },
		WhatsnewList: { screen: WhatsnewList, navigationOptions: { gestureEnabled: false } },
		Blog: { screen: Blog, navigationOptions: { gestureEnabled: false } },
		MediaGallery: { screen: MediaGallery, navigationOptions: { gestureEnabled: false } },
		Lessons: { screen: Lessons, navigationOptions: { gestureEnabled: false } },
		LessonDetails: { screen: LessonDetails, navigationOptions: { gestureEnabled: false } },
		AboutUs: { screen: AboutUs, navigationOptions: { gestureEnabled: false } },
		StudyMaterials: { screen: StudyMaterials, navigationOptions: { gestureEnabled: false } },
		AddSubscription: { screen: AddSubscription, navigationOptions: { gestureEnabled: false } },
		Profile: { screen: Profile, navigationOptions: { gestureEnabled: false } },
		video: { screen: video, navigationOptions: { gestureEnabled: false } },
		BlogComent: { screen: BlogComent, navigationOptions: { gestureEnabled: false } },
		Faq: { screen: Faq, navigationOptions: { gestureEnabled: false } },
		pdf: { screen: pdf, navigationOptions: { gestureEnabled: false } },
		LearningProgress: { screen: LearningProgress, navigationOptions: { gestureEnabled: false } }

	},
	{
		initialRouteName: (getUser('userId') && value == null) ? "Login" : "Home",
		headerMode: "none"
	}



);




const AppContainer = createAppContainer(AppNavigator);
export default () => <StripeProvider
	publishableKey={"pk_live_XeuUMD5MLCmbNDo8TpoDgL3700aC2ENsxW"}>
	<AppContainer />
</StripeProvider>

import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import loginApiReducer from '../reducers/loginApiReducer';
import blogListingReducer from '../reducers/blogListingReducer';
import signupReducer from './../reducers/signupReducer';
import logoutReducer from '../reducers/logoutReducer';
import HomeReducer from '../reducers/HomeReducer';
import aboutUsReducer from '../reducers/aboutUsReducer';
import mediaGalleryReducer from '../reducers/mediaGalleryReducer';
import lessonListingCategoryReducer from '../reducers/lessonListingCategoryReducer';
import lessonListingReducer from '../reducers/lessonListingReducer';
import lessonDetailsReducer from '../reducers/lessonDetailsReducer';
import messageReducer from '../reducers/messageReducer';
import forgotPasswordReducer from '../reducers/forgotPasswordReducer';
import SubscriptionListingReducer from '../reducers/SubscriptionListingReducer';
import StudyMaterials from '../reducers/studyMaterialsReducer'
import FAQ from '../reducers/faqReducer';
import eventReducer from '../reducers/eventReducer';
const rootReducer = combineReducers(
{ signupReducerConfig : signupReducer ,
loginApiResponseDataConfig : loginApiReducer, 
logoutApiResponseDataConfig : logoutReducer,
homeApiResponseDataConfig:HomeReducer,
blogListingApiResponseDataConfig:blogListingReducer, 
aboutUsApiResponseDataConfig:aboutUsReducer,
mediaGalleryApiResponseDataConfig:mediaGalleryReducer,
lessonListingApiResponseDataConfig:lessonListingReducer,
lessonCategoryListingApiResponseDataConfig:lessonListingCategoryReducer,
lessonDetailsApiResponseDataConfig:lessonDetailsReducer,
messageApiResponseDataConfig:messageReducer,
forgotPasswordApiResponseDataConfig:forgotPasswordReducer,
SubscriptionListingApiResponseDataConfig:SubscriptionListingReducer,
studyMaterialsApiResponseDataConfig:StudyMaterials,
faqApiResponseDataConfig:FAQ,
eventReducerApiResponseDataConfig:eventReducer
}
);
const configureStore = () => {
return legacy_createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;
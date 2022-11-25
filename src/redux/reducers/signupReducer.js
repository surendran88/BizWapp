/* eslint-disable no-alert */
import { API_SUBSCRIPTION_LISTING } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
import { API_SIGNUP} from '../constants';
import { API_UPDATE_PROFILE} from '../constants';
import { API_BUY_SUBSCRIPTION} from '../constants';
import { API_PROMO_CODE} from '../constants';
const initialState = {
  signupDetails: [],
  subscriptionDetails: [],
  loading: false,
  message:'',
  result:false,
  subsmessage:'',
  subresult:'',
  promoRes:{},
  promomessage:'',
  promoresult:'',

};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_SIGNUP:{
      return {
          ...state,
          signupDetails: action.payload,
          loading : false,
          
          message:action.message                
        };
     }
     case API_SUBSCRIPTION_LISTING:{
      return {
          ...state,
          subscriptionDetails: action.payload,
          loading : false,                
          message:action.message ,
          result:action.result               
        };
     }
     case API_BUY_SUBSCRIPTION:{
      return {
          ...state,
          
          loading : false,                
          submessage:action.message ,
          subresult:action.result               
        };
     }
     case API_PROMO_CODE:{
      return {
          ...state,
          
          promoRes: action.payload,
          loading : false,                
          promomessage:action.message ,
          promoresult:action.result                
        };
     }
     case API_SUBSCRIPTION_LISTING:{
      return {
          ...state,
          subscriptionDetails: action.payload,
          loading : false,                
          message:action.message ,
          result:action.result               
        };
     }
     case API_UPDATE_PROFILE:{
      return {
          ...state,
          loading : false,                
          message:action.message ,
          result:action.result               
        };
     }
     case API_RESULT:{
      return {
          ...state,                
          result : action.payload,
          loading : false,
        };
     }
     case API_FAIL : {
         alert(JSON.stringify(action.payload.error.message));
      return {
          ...state,
          signupDetails: action.payload,
          loading : false
          
        };
     }
     case API_BEGIN : {
      return {
          ...state,
          signupDetails: action.payload,
          loading : true
          
        };
     }

    default:
      return state;
  }
};
export default signupReducer;

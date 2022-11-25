import { API_SIGNUP } from '../constants';
import { API_BEGIN } from '../constants';
import { API_SUBSCRIPTION_LISTING } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
import { API_UPDATE_PROFILE } from '../constants';
import { API_PROMO_CODE } from '../constants';
import { API_BUY_SUBSCRIPTION } from '../constants';
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';


export const fetchProductsBegin = () => ({
  type: API_BEGIN
});

export const fetchSignUpSuccess = data => ({
  type: API_SIGNUP,
  payload:  data ,
  message: data.message
});
export const fetchData = data => ({
  type: API_SUBSCRIPTION_LISTING,
  payload:  data.data ,
  message: data.message,
  result:data.result
});
export const fetchUpdateData = data => ({
  type: API_UPDATE_PROFILE,
 
  message: data.message,
  result:data.result
});

export const checkPromoCode = data => ({
  type: API_PROMO_CODE,
  payload:  data.data ,
  message: data.message,
  result:data.result
});
export const buySubscription = data => ({
  type: API_BUY_SUBSCRIPTION,
 
  message: data.message,
  result:data.result
});
export const fetchProductsResult = result => ({
  type: API_RESULT,
  payload:  result ,

});
export const fetchProductsFailure = error => ({
  type: API_FAIL,
  payload: { error }
});

//USING AXIOS
export function callSignUp(param){
  const request = axios.post(Constant.BASEURL+Constant.SIGNUP,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      dispatch(fetchProductsResult(data.data.result))
      dispatch(fetchSignUpSuccess(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
  

export function getsubscriptionListingData(param){
  const request = axios.post(Constant.BASEURL+Constant.SUBSCRIPTION_LISTING_PLANS,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(fetchData(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
  
export function getUpdateData(param){
  const request = axios.post(Constant.BASEURL+Constant.UPDATE_PROFILE,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(fetchUpdateData(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
export function buySubscriptionprice(param){
  const request = axios.post(Constant.BASEURL+Constant.BUY_SUBSCRIPTION,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(buySubscription(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
export function checkPromoCodeDetails(param){
  const request = axios.post(Constant.BASEURL+Constant.CHECK_PROMOCODE,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(checkPromoCode(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
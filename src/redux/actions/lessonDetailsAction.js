import { API_BEGIN } from '../constants';
import { API_LESSON_DETAILS } from '../constants';
import { API_FAIL } from '../constants';
import { API_SUBSCRIPTION_STATUS } from '../constants';
import { API_RESULT } from '../constants';
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';
// import console = require('console');

export const fetchProductsBegin = () => ({
  type: API_BEGIN
});
export const fetchData = data => ({
  type: API_LESSON_DETAILS,
  payload:  data.data ,
  message: data.message,
  result:data.result
});

export const fetchSubscriptionStatus = data => ({
  type: API_SUBSCRIPTION_STATUS,
  message: data.message,
  result:data.result
});
export const fetchProductsFailure = error => ({
  type: API_FAIL,
  payload: { error }
});

//USING AXIOS
export function getigbolessonDetails(param){
  const request = axios.post(Constant.BASEURL+Constant.IGBO_LESSON_DETAILS,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      console.log(data)
      dispatch(fetchData(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
export function getlessonDetails(param){
  const request = axios.post(Constant.BASEURL+Constant.LESSONDETAILS,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      console.log(data)
      dispatch(fetchData(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
  
export function getSubscriptionDetails(param){
  const request = axios.post(Constant.BASEURL+Constant.SUBSCRIPTION_STATUS,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      console.log(data)
      dispatch(fetchSubscriptionStatus(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}

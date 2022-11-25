import { API_BEGIN } from '../constants';
import { API_LESSON_CATEGORY_LISTING } from '../constants';
import { API_LESSON_LISTING_USER_ID } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';

export const fetchProductsBegin = () => ({
  type: API_BEGIN
});
export const fetchData = data => ({
  type: API_LESSON_CATEGORY_LISTING,
  payload:  data.data ,
  message: data.message,
  result:data.result
});
export const fetchDatabyUserId = data => ({
  type: API_LESSON_LISTING_USER_ID,
  payload:  data.data ,
  message: data.message,
  result:data.result
});
export const fetchProductsFailure = error => ({
  type: API_FAIL,
  payload: { error }
});

//USING AXIOS
export function getIgboLessonCategoryData(param){
  const request = axios.post(Constant.BASEURL+Constant.IGBOLESSONCATEGORYLISTING,param,Utils.postHeader());
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
export function getLessonCategoryData(param){
  const request = axios.post(Constant.BASEURL+Constant.LESSONCATEGORYLISTING,param,Utils.postHeader());
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
export function getigboLessonCategoryByUserId(param){
  const request = axios.post(Constant.BASEURL+Constant.IGBOLESSONCATEGORYUSERID,param,Utils.postHeader());
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

export function getLessonCategoryByUserId(param){
  const request = axios.post(Constant.BASEURL+Constant.LESSONCATEGORYUSERID,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(fetchDatabyUserId(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
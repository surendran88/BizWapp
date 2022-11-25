import { API_SUCCESS } from '../constants';
import { API_FORGOT_PASSWORD } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';


export const fetchProductsBegin = () => ({
  type: API_BEGIN
});

export const fetchProductsSuccess = data => ({
  type: API_SUCCESS,
  payload:  data ,
  message: data.message
});
export const fetchForgotPasswordSuccess = data => ({
  type: API_FORGOT_PASSWORD,
  payload:  data ,
  message: data.message
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
export function callLogin(param){
  const request = axios.post(Constant.BASEURL+Constant.SIGNIN,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      dispatch(fetchProductsResult(data.data.result))
      dispatch(fetchProductsSuccess(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
export function forgotPassword(param){
  const request = axios.post(Constant.BASEURL+Constant.FORGOT_PASSWORD,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      dispatch(fetchProductsResult(data.data.result))
      dispatch(fetchForgotPasswordSuccess(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}


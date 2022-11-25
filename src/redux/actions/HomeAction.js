import { API_BEGIN, API_LOGOUT } from '../constants';
import { API_VLS } from '../constants';
import { API_FAIL } from '../constants';
import { API_USER_DETAILS } from '../constants';
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';

export const fetchProductsBegin = () => ({
  type: API_BEGIN
});
export const fetchData = data => ({
  type: API_VLS,
  payload:  data.data.data ,
  seasonal:data.data.igbo_module_list,
  message: data.data.message,
  result:data.data.result
});
export const logout = data => ({
  type: API_LOGOUT, 
  message: data.message,
  result:data.result
});
export const userDetails = data => ({
  type: API_USER_DETAILS, 
  payload:  data.data,
  message: data.message,
  result:data.result
});
export const fetchProductsFailure = error => ({
  type: API_FAIL,
  payload: { error }
});

//USING AXIOS
export function getHomeData(param){
  const request = axios.post(Constant.BASEURL+Constant.VLS,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(fetchData(data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
  
export function Logout(param){
  const request = axios.post(Constant.BASEURL+Constant.LOGOUT,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(logout(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
  
export function UserDetails(param){
  const request = axios.post(Constant.BASEURL+Constant.USER_DETAILS,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      
      dispatch(userDetails(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}

import { API_BEGIN, API_LOGOUT } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';

export const fetchProductsBegin = () => ({
  type: API_BEGIN
});

export const fetchLogout = data => ({
  type: API_LOGOUT,
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
export function callLogout(param){
  const request = axios.post(Constant.BASEURL+Constant.LOGOUT,param,Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
      // Handle Success response here
      dispatch(fetchProductsResult(data.data.result))
      dispatch(fetchLogout(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
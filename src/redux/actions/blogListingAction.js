import { API_BEGIN } from '../constants';
import { API_BLOG_LIST } from '../constants';
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
  type: API_BLOG_LIST,
  payload:  data.data ,
  message: data.message,
  result:data.result
});

export const fetchProductsFailure = error => ({
  type: API_FAIL,
  payload: { error }
});

//USING AXIOS
export function getBlogData(param){
  const request = axios.post(Constant.BASEURL+Constant.BLOGLIST,param,Utils.postHeader());
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
  


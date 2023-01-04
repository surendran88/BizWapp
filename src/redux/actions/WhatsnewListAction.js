import { API_WHATSNEW_LIST } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants'; 
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';


export const fetchProductsBegin = () => ({
  type: API_BEGIN
});

export const fetchWhatNewSuccess = data => ({
  type: API_WHATSNEW_LIST,
  payload:  data.data ,
  message: data.message,
  result:  data.result ,
});
 
export const fetchProductsFailure = error => ({
  type: API_FAIL,
  payload: { error }
});

//USING AXIOS
export function whatsnewList(){
  const request = axios.post(Constant.STAGINGURL+Constant.WHATSNEW_LIST,{},Utils.postHeader());
  return dispatch => {
    dispatch(fetchProductsBegin());
    return request.then((data) => {
    
    dispatch(fetchWhatNewSuccess(data.data));
      return data.data;
    }).catch((error) => {
      // Handle error here, you can show error alert here or within reducer
        dispatch(fetchProductsFailure(error))
    })
  }
}
  


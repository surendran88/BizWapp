import { API_BEGIN, API_EVENT_LIST } from '../constants';
import { API_BLOG_LIST } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
import { NavigationActions } from 'react-navigation';
import Constant from '../constants';
import Utils from '../../Utils/utils';
import axios from 'axios';


export const fetchEventBegin = () => ({
    type: API_BEGIN
  });

  export const fetchData = data => ({
    type: API_EVENT_LIST,
    payload:  data.data ,
    message: data.message,
    result:[data.result]
  });
  

  
export const fetchEventFailure = error => ({
    type: API_FAIL,
    payload: { error }
  });
  
  //USING AXIOS
  export function getEventData(param){

    const request = axios.get(Constant.CALENDARURL+Constant.Events,param);
    return dispatch => {
      dispatch(fetchEventBegin());
      return request.then((data) => {
        // Handle Success response here
        //  console.log("axios Call ",data.data);
        dispatch(fetchData(data.data));
        return data.data;
      }).catch((error) => {
        // Handle error here, you can show error alert here or within reducer
          dispatch(fetchEventFailure(error))
      })
    }
  }
    
  
  
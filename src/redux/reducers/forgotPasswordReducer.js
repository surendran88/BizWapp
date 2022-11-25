import { API_FORGOT_PASSWORD } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const initialState = {
forgotData: [],
loading: false,
message:'',
result:false
};
const forgotPasswordReducer = (state = initialState, action) => {
    switch(action.type) {
        case API_FORGOT_PASSWORD:{
            return {
                ...state,
                forgotData: action.payload,
                loading : false,                
                message:action.message                
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
                forgotData: action.payload,
                loading : false
                
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                forgotData: action.payload,
                loading : true
                
              };
           }
         default:
           return state;
           }
}
export default forgotPasswordReducer;
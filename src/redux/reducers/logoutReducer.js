import { API_SUCCESS, API_LOGOUT } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const initialState = {
responseData: [],
loading: false,
message:'',
result:false
};
const logoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case API_LOGOUT:{
            return {
                ...state,
                responseData: action.payload,
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
                responseData: action.payload,
                loading : false
                
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                responseData: action.payload,
                loading : true
                
              };
           }
         default:
           return state;
           }
}
export default logoutReducer;
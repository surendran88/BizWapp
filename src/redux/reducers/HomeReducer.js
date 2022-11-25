import { API_SUCCESS, API_VLS } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_LOGOUT } from '../constants';
import { API_USER_DETAILS } from '../constants';
const homeState = {
data: [],
igbo_module_list:[],
loading: false,
message:'',
result:false,
userDetails:[],
userLoading:false,
userMessage:'',
userResult:false
};
const HomeReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_VLS:{
            return {
                ...state,
                data: action.payload,
                igbo_module_list:action.seasonal,
                loading : false,                
                message:action.message ,
                result:action.result               
              };
           }
           case API_USER_DETAILS:{
            return {
                ...state,
                userDetails: action.payload,
                userLoading : false,                
                userMessage:action.message ,
                userResult:action.result               
              };
           }
           case API_LOGOUT:{
            return {
                ...state,
                loading : false,            
                message:action.message ,
                result:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                responseData: action.payload,
                loading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                data: action.payload,
                loading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default HomeReducer;
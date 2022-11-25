import { API_BLOG_LIST } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const homeState = {
data: [],
loading: false,
message:'',
result:false
};
const blogListingReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_BLOG_LIST:{
            return {
                ...state,
                data: action.payload,
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
export default blogListingReducer;
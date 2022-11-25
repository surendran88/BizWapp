import { API_ABOUT_US } from '../constants';
import { API_BEGIN } from '../constants';
import { API_FAIL } from '../constants';
import { API_RESULT } from '../constants';
const homeState = {
aboutUsdata: [],
loading: false,
message:'',
result:false
};
const aboutUsReducer = (state = homeState, action) => {
    switch(action.type) {
        case API_ABOUT_US:{
            return {
                ...state,
                aboutUsdata: action.payload,
                loading : false,                
                message:action.message ,
                result:action.result               
              };
           }
           case API_BEGIN : {
            return {
                ...state,
                aboutUsdata: action.payload,
                loading : true
                
              };
           }
                    case API_FAIL : {
               alert(JSON.stringify(action.payload.error.message));
            return {
                ...state,
                aboutUsdata: action.payload,
                loading : false
                
              };
           }
        
         default:
           return state;
           }
}
export default aboutUsReducer;